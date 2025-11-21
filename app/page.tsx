import { Hero } from '@/components/Hero';
import { TripInfo } from '@/components/TripInfo';
import { Countdown } from '@/components/Countdown';
import { Itinerary } from '@/components/Itinerary';
import { RoomAssignments } from '@/components/RoomAssignments';
import { Weather } from '@/components/Weather';

export default function Home() {
  return (
    <>
      <Hero />
      <TripInfo />
      <Countdown />
      <Itinerary />
      <RoomAssignments />
      <Weather />
    </>
  );
}