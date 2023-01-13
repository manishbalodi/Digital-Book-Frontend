export class SignupDetails{
    public userName : String;
    public userFirstName : String;
    public userLastname : String;
    public userPassword : String;
    public role : any;

    constructor(userName : String,userFirstName : String,userLastname : String, userPassword : String,role : any){
        this.userName = userName;
        this.userFirstName = userFirstName;
        this.userLastname = userLastname;
        this.userPassword = userPassword;
        this.role = role;
    }
}