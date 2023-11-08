import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from './Test';

const Router = () => {
  <BrowserRouter>
    <Routes>
      <Route path="/message" element={<Test />} />
    </Routes>
  </BrowserRouter>;
};
