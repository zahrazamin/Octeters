import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import SolutionsPage from './pages/SolutionsPage';
import SolutionDetailPage from './pages/SolutionDetailPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import CaseStudyDetailPage from './pages/CaseStudyDetailPage';
import ContactPage from './pages/ContactPage';
import CompanyPage from './pages/CompanyPage';
import ResourcesPage from './pages/ResourcesPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/"                         element={<HomePage />} />
          <Route path="/services"                 element={<ServicesPage />} />
          <Route path="/services/:serviceId"      element={<ServiceDetailPage />} />
          <Route path="/solutions"                element={<SolutionsPage />} />
          <Route path="/solutions/:solutionId"    element={<SolutionDetailPage />} />
          <Route path="/case-studies"             element={<CaseStudiesPage />} />
          <Route path="/case-studies/:caseId"     element={<CaseStudyDetailPage />} />
          <Route path="/contact"                  element={<ContactPage />} />
          <Route path="/company"                  element={<CompanyPage />} />
          <Route path="/resources"               element={<ResourcesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
