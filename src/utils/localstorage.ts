export class LocalStorage{
    public keys: string[];

    // constructor(keys: string[]){
    //     this.keys = keys;
    // }

    setKeyValue(key: string, value:string)  {
        localStorage.setItem(key, value);
    }

    getValue(key: string|string[]){
        this.keys = Array.isArray(key) ? key : [key];
        for(let key of this.keys){
            const value = localStorage.getItem(key);
            if(value !== null){
                return value 
            }

        }
    }
    
    getValueAndRemove(key: string|string[]){
        this.keys = Array.isArray(key) ? key : [key];
        for(let key of this.keys){
            const value = localStorage.getItem(key);
            if(value !== null){
                this.remove(key)
                return value 
            }

        }
    }

    remove(key: string){
        return localStorage.removeItem(key)
    }
}