export function CalculateCoast(
  checkIn: string,
  checkOut: string,
  roomPrice: number
) {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  const nights =
    (Number(checkOutDate) - Number(checkInDate)) / (1000 * 60 * 60 * 24);

  return nights * roomPrice;
}
