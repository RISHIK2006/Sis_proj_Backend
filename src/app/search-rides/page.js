import DashboardLayout from "../../components/DashboardLayout";
import SearchForm from "../../components/SearchForm";
import RideCard from "../../components/RideCard";

export default function SearchRidePage() {

  const rides = [
    {
      driver: "Rahul Reddy",
      pickup: "Ghatkesar",
      destination: "Uppal",
      date: "20 July 2026",
      time: "8:30 AM",
      seats: 3,
      vehicle: "Car",
      fare: 90,
      rating: 4.8,
      aiMatch: 95,
    },
    {
      driver: "Priya Sharma",
      pickup: "ECIL",
      destination: "Habsiguda",
      date: "20 July 2026",
      time: "9:00 AM",
      seats: 2,
      vehicle: "Scooter",
      fare: 60,
      rating: 4.9,
      aiMatch: 92,
    },
    {
      driver: "Akhil Kumar",
      pickup: "Nagole",
      destination: "GCET",
      date: "20 July 2026",
      time: "8:15 AM",
      seats: 1,
      vehicle: "Bike",
      fare: 50,
      rating: 4.7,
      aiMatch: 90,
    },
  ];

  return (
   <DashboardLayout
  title="Search Ride"
  subtitle="Find rides that match your destination."
>

      <SearchForm />

      <h3 className="fw-bold mb-4">
        Available Rides
      </h3>

      {rides.map((ride, index) => (
        <RideCard
          key={index}
          {...ride}
        />
      ))}

    </DashboardLayout>
  );
}