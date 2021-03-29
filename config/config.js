const config = {
    url: {
      fullUrl: 'https://www.domain.com.au/sale/adelaide-sa/house/?establishedtype=established&sort=dateupdated-desc',
      system: 'DOMAIN'
    },
    db: {
      url: 'mongodb://localhost:27017',
      mongodb: 'jobdb'
    },
    keywordMap: {
      node: 'nodejs'
    },
      excludeSuburbs: 
     [
       'SALISBURY', 'ELIZABETH', 'GREENWITH', 'PASADENA', 'CHRISTIE', 'HACKHAM', 'CLAIR', 'SURREY', 'BRAHMA', 'DAW',
      'VALLEY', 'WEST LAKES', 'ATHELSTONE','FLINDERS', 'REDWOOD', 'MODBURY', 'TAPEROO', 'FLAGSTAFF', 'GOLDEN',
      'PARAFIELD', 'CRAIGMORE', 'PARALOWIE','MORPHETT', 'FINDON', 'ENFIELD', 'REYNELLA', 'ROSTREVOR' ,'GULLY', 'HALLETT',
      'WALKLEY', 'SEAFORD', 'MAWSON','DAVOREN', 'SALISBURY', 'DERNANCOURT', 'POORAKA', 'PARADISE', 'GAWLER', 'BURTON',
      'WOODVILLE', 'ABERFOYLE', 'KLEMZIG','PLYMPTON', 'SMITHFIELD', 'GULFVIEW', 'MUNNO', 'INGLE' ,'LIGHTSVIEW',
      'MARYS', 'ROYAL', 'NEWTON','GRANGE', 'CLAPHAM', 'WINDSOR', 'ROSEWATER', 'VALE' ,'MARION',
      'SULLIVAN', 'OAKLANDS', 'WARRADALE','WESTBOURNE', 'VISTA', 'KIDMAN', 'NOARLUNGA', 'GLENGOWRIE' ,
      'NORTHGATE', 'KILBURN', 'WATTLE','HUNTFIELD', 'NOVAR', 'MITCHELL', 'CLARENCE', 'RIDGEHAVEN' ,
      'SHEIDOW', 'SOMERTON', 'EDWARDS','SEATON', 'ANDREW', 'BLAIR', 'EXETER', 
      'BRADBURY', 'QUEENSTOWN', 'SEMAPHORE','GLENELG', 'MOUNGT BARKER', 
      'GILLES', 'OAKDEN','HAMPSTEAD','FAIRVIEW','BANKSIA','LARGS','HILLBANK',
      'MARDEN','HEWETT','DOVAR','SEAVIEW','CAMDEN','BIRKENHEAD','FIRLE','CAMPBELLTOWN','ASCOT',
      'HAHNDORF','BARKER','KURRALTA','DOVER','BRIGHTON','BELAIR','BLAKEVIEW','ASCOT','TORRENS','ANGLE',
      'SEFTON','ANGLE','MARINO','HECTORVILLE','GLENALTA','EVANSTON'

    ]
    
};


module.exports = config;