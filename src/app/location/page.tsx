import { LocationsCatalog } from "@/app/location/LocationsCatalog/LocationsCatalog";
import { Suspense } from "react";

const LocationsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LocationsCatalog />
    </Suspense>
  )
}

export default LocationsPage;