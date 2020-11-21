export class User
{   
    public _id?: string;
    public Fullname: string;
    public Email: string;
    public Dateofbirth: Date;
    public Mobile: number;
    public Password: string;
    public Address: string;
    public City: string;


    constructor(o_address:string,o_id:string)
    {

        this.Address = o_address;
        this._id = o_id;
       

    }
}