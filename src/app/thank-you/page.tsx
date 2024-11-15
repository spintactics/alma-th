import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h2 className="text-3xl font-bold mb-4">Thank You</h2>
      <p className="text-lg text-gray-600 mb-8">
        Your information was submitted to our team of immigration attorneys...
      </p>
      <Link href="/">
        <button className="bg-gray-800 text-white py-3 px-6 rounded-lg">
          Go Back to Homepage
        </button>
      </Link>
    </div>
  );
}
