export class Userlogin {
    public Email : string;
    public Fullname : string;
    public _id? : string;


constructor(p_email:string,p_id:string,p_name:string)
    {

        this.Email = p_email;
        this.Fullname = p_name;
        this._id = p_id;

    }


  
    
  }
  