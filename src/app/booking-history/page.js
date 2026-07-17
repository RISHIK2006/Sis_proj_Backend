import DashboardLayout from "../../components/DashboardLayout";
import BookingCard from "../../components/BookingCard";

export default function BookingHistoryPage() {

  const bookings = [
    {
      driver: "Rahul Reddy",
      route: "Ghatkesar → Uppal",
      date: "20 July 2026",
      time: "8:30 AM",
      fare: 90,
      status: "Upcoming",
    },
    {
      driver: "Priya Sharma",
      route: "ECIL → Habsiguda",
      date: "18 July 2026",
      time: "9:00 AM",
      fare: 60,
      status: "Completed",
    },
    {
      driver: "Akhil Kumar",
      route: "Nagole → GCET",
      date: "15 July 2026",
      time: "8:15 AM",
      fare: 50,
      status: "Completed",
    },
  ];

  return (
    <DashboardLayout
      title="Booking History"
      subtitle="View your current and previous ride bookings."
    >

      <div className="mb-4">
        <h3 className="fw-bold">
          My Bookings
        </h3>
      </div>

      {bookings.map((booking, index) => (
        <BookingCard
          key={index}
          {...booking}
        />
      ))}

    </DashboardLayout>
  );
}