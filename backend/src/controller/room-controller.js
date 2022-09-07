import GetParkingLot from "../core/usecase/GetParkingLot";
import ParkingLotRepositorySQL from "../infra/repository/ParkingLotRepositorySQL";

class RoomController {
	static async getParkingLot (params, body) {
		const parkingLotRepositorySQL = new ParkingLotRepositorySQL();
		const getParkingLot = new GetParkingLot(parkingLotRepositorySQL);
		const parkingLot = await getParkingLot.execute(params.code);
		return parkingLot;
	}
}

module.exports = RoomController