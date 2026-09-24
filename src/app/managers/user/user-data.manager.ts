import { Injectable } from "@angular/core";
import { UserResponseDTO } from "../../dtos/auth/auth.response.dto";

@Injectable({
    providedIn: 'root'
})
export class UserDataManager {
    static saveData(user: UserResponseDTO) {
        localStorage.setItem("userData", JSON.stringify(user))
    }

    static getData(): UserResponseDTO {
        return JSON.parse(localStorage.getItem("userData")!)
    }
}