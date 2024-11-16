import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-white">
      <img
        src="/assets/i-file.png"
        alt="i file"
        className="h-14 mb-4 mx-auto"
      />
      <h2 className="text-3xl text-black font-bold mb-5">Thank You</h2>
      <p className="text-lg text-black font-semibold mb-8" style={{ width: '40vw' }}>
        Your information was submitted to our team of immigration attorneys. Expect an email from hello@tryalma.ai.
      </p>
      <Link href="/">
        <button className="bg-gray-800 text-white py-3 px-6 rounded-lg" style={{ width: '25vw' }}>
          Go Back to Homepage
        </button>
      </Link>
    </div>
  );
}
