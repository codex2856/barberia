// End-to-end check of the admin panel, run in CI against `vite preview`.
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:4173/";
const steps = [];
const problems = [];

async function step(name, fn) {
  try {
    await fn();
    steps.push(`PASS  ${name}`);
  } catch (e) {
    steps.push(`FAIL  ${name}\n      ${String(e.message).split("\n")[0]}`);
    problems.push(name);
  }
}

const browser = await chromium.launch();
const context = await browser.newContext({ locale: "es-ES", viewport: { width: 1280, height: 900 } });
const page = await context.newPage();
const pageErrors = [];
page.on("pageerror", (e) => pageErrors.push(e.message));
page.setDefaultTimeout(8000);

const ADMIN = BASE + "#/admin";
const dayButtons = () => page.locator('[role="dialog"] button[aria-pressed]:not([disabled])');

function isoLocal(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// A day that is certainly open (not Sunday), to block it.
const toBlock = new Date();
toBlock.setDate(toBlock.getDate() + 1);
if (toBlock.getDay() === 0) toBlock.setDate(toBlock.getDate() + 1);
const blockedIso = isoLocal(toBlock);

let baselineDays = 0;
let confirmationId = "";

await step("Public site loads and the date picker has open days", async () => {
  await page.goto(BASE);
  await page.getByRole("button", { name: /agendar cita/i }).first().click();
  await page.getByRole("dialog").waitFor();
  await page.locator('[role="dialog"] button[aria-pressed]').first().click();
  await page.getByText("ELIGE FECHA").waitFor();
  baselineDays = await dayButtons().count();
  if (baselineDays < 5) throw new Error(`only ${baselineDays} open days`);
});

await step("Admin: wrong password is rejected", async () => {
  await page.goto("about:blank");
  await page.goto(ADMIN);
  await page.getByLabel("Contraseña").fill("incorrecta");
  await page.getByRole("button", { name: "Entrar" }).click();
  await page.getByText("Contraseña incorrecta.").waitFor();
});

await step("Admin: demo password logs in", async () => {
  await page.getByLabel("Contraseña").fill("barber2026");
  await page.getByRole("button", { name: "Entrar" }).click();
  await page.getByRole("heading", { name: /Admin/ }).waitFor();
});

await step("Admin: edit a service price and save", async () => {
  await page.getByRole("button", { name: "Servicios", exact: true }).click();
  await page.locator('input[inputmode="decimal"]').first().fill("99");
  await page.getByRole("button", { name: "Guardar cambios" }).click();
  await page.getByText("Servicios guardados").waitFor();
});

await step("Admin: reject an empty service name", async () => {
  await page.getByRole("button", { name: "Añadir servicio" }).click();
  await page.getByRole("button", { name: "Guardar cambios" }).click();
  await page.getByText("Todos los servicios necesitan un nombre.").waitFor();
  // remove the empty row again
  await page.getByRole("button", { name: "Quitar" }).last().click();
});

await step("Admin: block a day off", async () => {
  await page.getByRole("button", { name: "Horarios", exact: true }).click();
  await page.getByLabel("Día libre").fill(blockedIso);
  await page.getByRole("button", { name: "Añadir día libre" }).click();
  await page.getByRole("button", { name: `Quitar ${blockedIso}` }).waitFor();
});

await step("Admin: reject closing time before opening time", async () => {
  await page.getByLabel("Cierre Lunes").fill("08:00");
  await page.getByRole("button", { name: "Guardar horario" }).click();
  await page.getByText(/la hora de cierre debe ser posterior/).waitFor();
  await page.getByLabel("Cierre Lunes").fill("19:00");
});

await step("Admin: upload a photo to the gallery", async () => {
  await page.getByRole("button", { name: "Galería", exact: true }).click();
  const png = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    "base64",
  );
  await page.locator('input[type="file"][multiple]').setInputFiles({ name: "prueba.png", mimeType: "image/png", buffer: png });
  await page.getByText("Sin foto").first().waitFor({ state: "attached" }).catch(() => {});
  await page.getByRole("button", { name: "Guardar galería" }).click();
  await page.getByText("Galería guardada").waitFor();
});

await step("Public site shows the new price, the uploaded photo and one day less", async () => {
  await page.goto(BASE);
  await page.getByText("99,00 €").first().waitFor();
  const photo = page.locator('[role="img"] img[src^="data:image"]');
  await photo.first().waitFor({ state: "attached" });
  await page.getByRole("button", { name: /agendar cita/i }).first().click();
  await page.locator('[role="dialog"] button[aria-pressed]').first().click();
  await page.getByText("ELIGE FECHA").waitFor();
  const after = await dayButtons().count();
  if (after !== baselineDays - 1) throw new Error(`open days went from ${baselineDays} to ${after}, expected ${baselineDays - 1}`);
});

await step("Public site: complete a booking", async () => {
  await dayButtons().first().click();
  await page.getByText("ELIGE HORA").waitFor();
  await page.getByText("Consultando disponibilidad…").waitFor({ state: "detached" });
  await dayButtons().first().click();
  await page.getByText("CITA CONFIRMADA").waitFor();
  const text = await page.getByText(/TB-[A-Z0-9]+/).first().innerText();
  confirmationId = text.match(/TB-[A-Z0-9]+/)[0];
});

await step("Admin: the booking appears and can be cancelled", async () => {
  await page.getByRole("button", { name: "Listo" }).click();
  await page.goto("about:blank");
  await page.goto(ADMIN);
  await page.getByLabel("Contraseña").fill("barber2026");
  await page.getByRole("button", { name: "Entrar" }).click();
  await page.getByText(`Código ${confirmationId}`).waitFor();
  await page.getByRole("button", { name: "Cancelar cita" }).click();
  await page.getByRole("button", { name: "Sí, cancelar" }).click();
  await page.getByText("Todavía no hay citas").waitFor();
});

await step("Admin: restore the original services", async () => {
  await page.getByRole("button", { name: "Servicios", exact: true }).click();
  await page.getByRole("button", { name: "Restaurar originales" }).click();
  await page.getByText("Servicios originales restaurados.").waitFor();
});

await step("No uncaught page errors", async () => {
  if (pageErrors.length) throw new Error(pageErrors.join(" | "));
});

await browser.close();
for (const line of steps) {
  const [head, ...rest] = line.split("\n");
  const msg = [head, ...rest.map((r) => r.trim())].join(" :: ").replace(/%/g, "%25");
  console.log(head.startsWith("FAIL") ? `::error title=e2e::${msg}` : `::notice title=e2e::${msg}`);
}
console.log(steps.join("\n"));
if (problems.length) {
  console.error(`\n${problems.length} step(s) failed`);
  process.exit(1);
}
console.log("\nAll steps passed");
