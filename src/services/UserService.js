import BaseService from "./BaseServices";

class UserSV extends BaseService {
    controller = "user"
}

const UserService = new UserSV();

export default UserService;
