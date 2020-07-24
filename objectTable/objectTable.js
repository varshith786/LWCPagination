import { LightningElement, api ,track } from 'lwc';
import getAccountList from '@salesforce/apex/RetriveRecords.getRecords';
import getaccounts from '@salesforce/apex/RetriveRecords.getRecords';
import updateRecord from '@salesforce/apex/RetriveRecords.updateRecord';



export default class ObjectTable extends LightningElement {
    @track idvar;
    @track start;
    @track account={'SObjecttype':'Account'};
    @track end;
    @track value='5';
    @track pageSize = 5;
    @track totalRecordCount;
    @track paginationList = [];
    @track objectName = 'Account';
    @track startingRecord=1;
    @track endingRecord=0;
    @track page=1;
    @track totalPage=0;
    @track openModel = false;
    @api fieldNames = ['Name','NumberOfEmployees','Favourite_Color__c','Active__c'];
    @track previousDisabled = false;
    @track nextDisabled=false;
    
    @track accountList=[];
    @track error;

    get entryList() {
        return [
            { label: '5', value: '5' },
            { label: '10', value: '10' },
            { label: '15', value: '15' },
            { label: '20', value: '20' },
        ];
    }

    get activeOptions()
    {
        return[
            {
                label:'Yes',value:'Yes'
            },
            {
                label:'No',value:'No'
            },

        ];
    }

    connectedCallback()
    {
        console.log('heloo');
        getAccountList({ObjectName: this.objectName,fields : this.fieldNames}).then(result =>{

            console.log(JSON.stringify(result));
            this.accountList = result;
            this.totalRecordCount = result.length;
            this.totalPage = Math.ceil(this.totalRecordCount / this.pageSize);
            this.paginationList = this.accountList.slice(0,this.pageSize); 
            this.endingRecord = this.pageSize;
            
        })
        .catch(error =>{
            this.error =  error;
        })
        this.previousDisabled = true;
    }

    displayRecordPerPage(page){

        this.startingRecord = ((page -1) * this.pageSize) ;
        this.endingRecord = (this.pageSize * page);

        this.endingRecord = (this.endingRecord > this.totalRecordCount) 
                            ? this.totalRecordCount : this.endingRecord; 

        this.paginationList = this.accountList.slice(this.startingRecord, this.endingRecord);
        this.startingRecord = this.startingRecord + 1;
    }

    handleChange(event)
    {
        this.pageSize = event.target.value;
        this.value = event.detail.value;
        this.totalPage = Math.ceil(this.totalRecordCount / this.pageSize);
        
    }
    firstHandler()
    {
        if(this.page > 1)
        {
            this.page = 1;
            this.displayRecordPerPage(this.page);
        }
        if(this.page==1)
        {
            this.previousDisabled=true;
            this.nextDisabled=false;
        }
        if(this.page==this.totalPage)
        {
            this.previousDisabled=false;
            this.nextDisabled=true;
        }
        if(this.page != 1 && this.page != this.totalPage)
        {
            this.previousDisabled=false;
            this.nextDisabled=false;
        }
    }
    lastHandler()
    {
        if((this.page<this.totalPage) && this.page !== this.totalPage){
            this.page = this.totalPage;
            this.displayRecordPerPage(this.page);
        }
        if(this.page==1)
        {
            this.previousDisabled=true;
            this.nextDisabled=false;
        }
        if(this.page==this.totalPage)
        {
            this.previousDisabled=false;
            this.nextDisabled=true;
        }
        if(this.page != 1 && this.page != this.totalPage)
        {
            this.previousDisabled=false;
            this.nextDisabled=false;
        }
    }
    previousHandler()
    {
        if (this.page > 1) {
            this.page = this.page - 1;
            this.displayRecordPerPage(this.page);
        }
        if(this.page==1)
        {
            this.previousDisabled=true;
            this.nextDisabled=false;
        }
        if(this.page==this.totalPage)
        {
            this.previousDisabled=false;
            this.nextDisabled=true;
        }
        if(this.page != 1 && this.page != this.totalPage)
        {
            this.previousDisabled=false;
            this.nextDisabled=false;
        }
    }
    nextHandler()
    {
        if((this.page<this.totalPage) && this.page !== this.totalPage){
            this.page = this.page + 1; 
            this.displayRecordPerPage(this.page);            
        }
        if(this.page==1)
        {
            this.previousDisabled=true;
            this.nextDisabled=false;
        }
        if(this.page==this.totalPage)
        {
            this.previousDisabled=false;
            this.nextDisabled=true;
        }
        if(this.page != 1 && this.page != this.totalPage)
        {
            this.previousDisabled=false;
            this.nextDisabled=false;
        }
    }

    editHandler(event)
    {
        this.openModel = true;
        this.idvar = event.target.name;
        for(let i=0;i<this.paginationList.length;i++)
        {
            if(this.idvar==this.paginationList[i].Id)
            {
                this.account.Id = this.paginationList[i].Id;
                this.account.Name = this.paginationList[i].Name;
                this.account.NumberOfEmployees = this.paginationList[i].NumberOfEmployees;
                this.account.Favourite_Color__c = this.paginationList[i].Favourite_Color__c;
                this.account.Active__c = this.paginationList[i].Active__c;
                //this.account.CreatedById = this.paginationList[i].CreatedById;
            }
        }
        
    }

    changeHandler(event)
    {
        if(event.target.label=='Name')
        {
            this.account.Name = event.target.value;
        }
        if(event.target.label=='NumberOfEmployees')
        {
            this.account.NumberOfEmployees = event.target.value;
        }
        if(event.target.label=='Favourite Color')
        {
            this.account.Favourite_Color__c = event.target.value;
        }
        if(event.target.label=='Active')
        {
            this.account.Active__c = event.target.value;
        }
        
    }
    
    saveMethod()
    {
        console.log(JSON.stringify(this.account));
        updateRecord({acc: this.account,fields : this.fieldNames}).then(result =>{
            alert('saved');
            this.accountList = result;
            this.totalRecordCount = result.length;
            this.totalPage = Math.ceil(this.totalRecordCount / this.pageSize);
            this.paginationList = this.accountList.slice(0,this.pageSize); 
            this.endingRecord = this.pageSize;
        })
        .catch(error =>{
            this.error =  error;
        })
        this.openModel = false;
    }

    closeModal()
    {
        this.openModel = false;
    }

}