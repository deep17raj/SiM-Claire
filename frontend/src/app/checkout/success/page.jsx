// app/checkout/success/page.jsx
import SuccessClientComponent from "./SuccessClientComponent";

// --- META DATA (Keep Google from indexing this private page) ---
export const metadata = {
  title: "Purchase Successful! | SimClaire",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SuccessPage() {
  return <SuccessClientComponent />;
}