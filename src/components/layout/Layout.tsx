import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { initLenis, destroyLenis } from '../../lib/lenis';

export default function Layout() {
  const { pathname } = useLocation();

  // Boot Lenis once on mount; tear down on unmount
  useEffect(() => {
    initLenis();
    return () => destroyLenis();
  }, []);

  // Jump to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
