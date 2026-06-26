import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function downloadReport(reportElement) {
  const canvas = await html2canvas(reportElement, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#0f1115",
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const width = 210;
  const height = (canvas.height * width) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, width, height);

  pdf.save("CareerWrapped_Report.pdf");
}