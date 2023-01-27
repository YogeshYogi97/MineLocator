public with sharing class OreReserveFinder {

    @AuraEnabled(cacheable=true)
    public static List<Element__c> getElements(){
        try {
            return [SELECT Id, Name FROM Element__c];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Mine__c> getAllMines(String recordId){
        try {
            System.debug('Invoked ' + recordId );
            if(recordId == 'All')
                return [SELECT Id, Name, Ore__c, Ore__r.Name, Location__latitude__s, Location__longitude__s from Mine__c];
            else{
                return [SELECT Id, Name, Ore__c, Ore__r.Name, Location__latitude__s, Location__longitude__s from Mine__c 
                WHERE Ore__c IN (SELECT Ore__c from OreElement__c WHERE Element__c = :recordId)];
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Mine__c> getNearByMines(String lat, String lon){
        try {
            return Database.query('SELECT Id, Name, Ore__c, Ore__r.Name, Location__latitude__s, Location__longitude__s from Mine__c ORDER BY DISTANCE(Location__c, GEOLOCATION(' + lat + ' , ' +lon + '), \'mi\') LIMIT 5');
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}