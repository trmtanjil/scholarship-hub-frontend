import { getSingleScholarshipAction } from "@/action/scholarship.action";
import { createPaymentIntentAction } from "@/action/payment.action"; // নিশ্চিত করো এটি ইম্পোর্ট করা আছে
import { StripeWrapper } from "@/components/payment/StripeWrapper";
import { notFound } from "next/navigation";

export default async function PaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: scholarship } = await getSingleScholarshipAction(id);

  if (!scholarship) return notFound();

  // সার্ভার সাইড থেকেই clientSecret তৈরি করে নাও
  const paymentResponse = await createPaymentIntentAction(scholarship.applicationFee);
  const clientSecret = paymentResponse.data?.clientSecret; // এখানে প্রপার্টি নাম চেক করো

  return (
    <div className="max-w-2xl mx-auto py-20">
      {/* যদি clientSecret না থাকে তবে এরর দেখাবে */}
      {!clientSecret ? (
        <div className="p-10 text-center bg-red-50 text-red-600 rounded-2xl">
          Failed to initialize payment. Please try again later.
        </div>
      ) : (
        <StripeWrapper 
          clientSecret={clientSecret} 
          amount={scholarship.applicationFee} 
          scholarshipId={id} 
        />
      )}
    </div>
  );
}