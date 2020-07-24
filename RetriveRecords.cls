public class RetriveRecords {
    @AuraEnabled
    public static List<SObject> getRecords(String ObjectName,String[] fields)
    {
        String query = 'SELECT Id,'+fields[0]+','+fields[1]+','+fields[2]+','+fields[3]+' FROM '+ObjectName+'';
        List<SObject> returnList = Database.query(query);
        System.debug(returnList);
        if(returnList.size()>0)
        {
            return returnList;
		}
        return NULL;
	}
    
    @AuraEnabled
    public static List<SObject> updateRecord(SObject acc,String[] fields)
    {
        System.debug(acc);
        
        if(acc!=NULL){
            update acc;
        }
            
        
        List<SObject> accList = getRecords('Account',fields);
        return accList;
       
	}
    

}