import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { FloatingWhatsAppButton } from "./components/FloatingWhatsAppButton";
import { CustomCursor } from "./components/ui/CustomCursor";
import { BookingProvider } from "./components/booking/BookingContext";
import { BookingDrawer } from "./components/booking/BookingDrawer";
import { Hero } from "./sections/Hero";
import { Services } from "./sections/Services";
import { Gallery } from "./sections/Gallery";
import { Reviews } from "./sections/Reviews";
import { Schedule } from "./sections/Schedule";
import { ReservaCTA } from "./sections/ReservaCTA";
import { Contact } from "./sections/Contact";
import { useLenis } from "./hooks/useLenis";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";

export default function App() {
  const reducedMotion = usePrefersReducedMotion();
  useLenis(!reducedMotion);

  return (
    <BookingProvider>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <Reviews />
        <Schedule />
        <ReservaCTA />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
      <BookingDrawer />
    </BookingProvider>
  );
}
