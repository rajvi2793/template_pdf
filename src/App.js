import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Rotues/Home/Home";
import About from "./Rotues/About/About";
import CompressPdf from "./component/Fucntional_Pages/CompressPdf";
import EditPdf from "./component/Fucntional_Pages/EditPdf";
import ExceltoPdf from "./component/Fucntional_Pages/ExceltoPdf";
import MergePdf from "./component/Fucntional_Pages/MergePdf";
import PdftoWord from "./component/Fucntional_Pages/PdftoWord";
import PdftoPowerpint from "./component/Fucntional_Pages/PdftoPowerpint";
import PdftoExecl from "./component/Fucntional_Pages/PdftoExecl";
import WordtoPdf from "./component/Fucntional_Pages/WordtoPdf";
import PowerpointtoPdf from "./component/Fucntional_Pages/PowerpointtoPdf";
import PdftoJpg from "./component/Fucntional_Pages/PdftoJpg";
import SignPdf from "./component/Fucntional_Pages/SignPdf";
import Watermark from "./component/Fucntional_Pages/Watermark";
import RotatePdf from "./component/Fucntional_Pages/RotatePdf";
import Navbar from "./component/navbar/Navbar";

import Main from "./component/SignpdfFunctional/main/Main";
import TempMain from "./component/TempateFunctional/templateMain/TempMain";
import { DragDropProvider } from "./component/TempateFunctional/DragDropContext";
import TempSignMain from "./component/TempSignFunctional/tempSignMain/TempSignMain";
import { TemplateProvider } from "./component/TempSignFunctional/TemplateSelectContext";

function App() {
  return (
    <>
    <DragDropProvider>
      <Navbar />
      <TemplateProvider>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/about" element={<About />} />
        <Route path="/compress-pdf" element={<CompressPdf></CompressPdf>} />
        <Route path="/edit-pdf" element={<EditPdf />} />
        <Route path="/merge-pdf" element={<ExceltoPdf />} />
        <Route path="/split-pdf" element={<MergePdf />} />
        <Route path="/pdf-to-word" element={<PdftoWord />} />
        <Route path="/pdf-to-power-point" element={<PdftoPowerpint />} />
        <Route path="/pdf-to-excel" element={<PdftoExecl />} />
        <Route path="/word-to-pdf" element={<WordtoPdf />} />
        <Route path="/ppt-to-pdf" element={<PowerpointtoPdf />} />
        <Route path="/excel-to-pdf" element={<ExceltoPdf />} />
        <Route path="/edit-pdf" element={<EditPdf />} />
        <Route path="/pdf-to-jpg" element={<PdftoJpg />} />
        <Route path="/sign-pdf" element={<SignPdf />} />
        <Route path="/water-mark" element={<Watermark />} />
        <Route path="/rotate-pdf" element={<RotatePdf />} />

        {/*-------------------This is a Testing Routing  ------------------------------- */}
        <Route path="/test1" element={<Main></Main>} />
        
        <Route path="/template" element={<TempMain></TempMain>} />
      
        <Route path="/tempSign" element={<TempSignMain></TempSignMain>} />
        
      </Routes>
      </TemplateProvider>
      </DragDropProvider>
    </>
  );
}

export default App;
