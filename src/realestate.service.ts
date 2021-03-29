import { Injectable } from '@nestjs/common';
//import { SearchService, PageSummary, UrlResult } from '../job-model';
import * as cheerio from 'cheerio';
import * as moment from 'moment';
import axios from 'axios';
import * as uuid from 'uuid';
import * as util from 'util';
import { UrlResult } from './model';
const config = require('./../config/config');


@Injectable()
export class RealestateService {

  private readonly PROCESS_LIMIT: number = 5000;
  private readonly MAX_PAGE_COUNT: number = 10;
  private type1s: Map<String,any> = new Map();
  private type2s: any [] = [];

  constructor() { }


  public async  doSeach(overrideLimit: number): Promise<any[]> {
    let limitToUse = (!overrideLimit || overrideLimit == 0) ? this.PROCESS_LIMIT : overrideLimit;
    console.log("limitToUse " + limitToUse);

    try {
      let jobEntries: any[] = await this.getUrlLinksWithoutDrillingDown(config.url.fullUrl, limitToUse);
      for (var key of this.type1s.keys()) {
        console.log('type1: ' + JSON.stringify(this.type1s.get(key)));
      }

      /*
      for (var type2 of this.type2s) {
        console.log('type2: ' + JSON.stringify(type2));
      }
      */
       

     
    } catch (err) {
      console.error(err);
    }
    return Array.from(this.type1s.values());

  }



  private async getUrlLinksWithoutDrillingDown(currentUrl, limitToUse): Promise<any[]> {

    try {
      // var links: JobEntry[] = [];
      var url = currentUrl;
      var nextPageExists = true;

      let currPage: number = 0;
      let alreadyThereCount = 0;

      // while ((nextPageExists) && alreadyThereCount < this.ALREADY_THERE_LIMIT  && links.length < limitToUse ) {
        while (currPage < this.MAX_PAGE_COUNT) {
          currPage++;
          await this.getNextSummaryPage(url, currPage);
        }
      /*
      if (!response.entries) {
        console.log('break......');
        break;
      }
      const filteredEntries: JobEntry[] = response.entries.filter(entry => !entry.link.includes('type=promoted'));
      const filteredAndNotThereEntries: JobEntry[] = await this.filterToOnlyNewJobs(filteredEntries);
     
      alreadyThereCount += filteredEntries.length - filteredAndNotThereEntries.length;

      links.push(...filteredAndNotThereEntries)
      if (!response.nextPageUrl) {
        nextPageExists = false;
        console.log('no next page......');
      } else {
        url = response.nextPageUrl;
      }
      */
      // }
      /*
      links.sort((a, b) => (a.jobid > b.jobid) ? 1 : -1);
      const numberToReturn = links.length < limitToUse ? links.length: limitToUse;
      const entriesToReturn = links.slice(0, numberToReturn);
      return entriesToReturn;
      */
      return null;
    } catch (err) {
      console.error(err);
    }

  }


  private async getNextSummaryPage(url, page): Promise<void> {
    console.log("xxxxxxxxxxx getNextSummaryPage" + url);
    //  const pageSummary: PageSummary = new PageSummary();

    let entries = [];
    //  pageSummary.entries = entries;

    // const baseUrl = config.seek.baseUrl;
    let fullUrl = (page > 1)? url + "&page=" + page: url
    console.log(" fullUrl: " + fullUrl);

    const result: UrlResult = await this.invokeUrl(fullUrl);
    console.log(" page result: " + page);

    const response: any = result.response;


   // console.log("excluded", config.excludeSuburbs)
    if (response && response.data) {
      let $ = cheerio.load(response.data);
      let scriptsget = $("script").get();
      let jsonText: String = "";
      scriptsget.forEach((item, index) => {
        let type = item.attribs.type;
        if (type == 'application/ld+json') {
          let propertyList: any[] = JSON.parse(item.children[0].data);
          propertyList.forEach((property, index) => {
            let address:any=null;
            if (property.location && property.location["@type"] == "Residence") {
              address = property.location.address;
            //  console.log("xxxx property " + JSON.stringify(property));
              if (this.suburbOk(address.addressLocality) && !this.type1s.has(address.streetAddress)) {
                this.type1s.set(address.streetAddress,{"address" : address, "url": property.url, "image": property.image});
              }
            } else  if (property["@type"]  && property["@type"] == "Residence") {
              address = property.address;
              if (this.suburbOk(address.addressLocality)) {
                this.type2s.push(address);
              }
            }

          });



        }

      })



    }

  }

  private suburbOk(suburb: String): Boolean {
    /*
    if (!config.excludeSuburbs.some(substring=>suburb.includes(substring))) {
      return true;
    } else {
      return false;
    }
    */

    for (var excludedSuburb of config.excludeSuburbs) {
      if (suburb.indexOf(excludedSuburb) != -1) {
        return false;
      }
    }

    return true;

  } 

 


  public async searchProperty(number: string, street: string , streetSuffix: string, suburb: string, state: string): Promise<void> {
    let searchUrl: string = 
     'https://www.bing.com/search?q=' + number +  '+' + street + '+' + streetSuffix + '+' + suburb + '+value' + uuid.v4();
     console.log("URL xxx" + searchUrl);
     let searchResult:UrlResult =   await (await this.invokeUrl(searchUrl));
     let page:any =   searchResult.response.data;
    // console.log("aaaaa page" + page);
     let $ = cheerio.load(page);
     let list = $('#b_results');
     console.log("list" + list);
     let listli = $('#b_results > li > h2 > a').each(function () {
   //  let listli = $('#b_results > li').each(function (index,elem) {
      let a = $(this);
     // console.log("list li" + Object.keys(a));
     // let h2 = $(this).children('h2');
    //  console.log("list li" + Object.keys(h2));
      console.log("list li" + a.text());
     })
   //  let listli2 = $('#b_results').children('li');
   //  console.log("type of listli" + Array.isArray(listli));
   //  console.log("type of listli2" + Array.isArray(listli2));
   //  console.log("aaaaa list li" + JSON.stringify(listli));

   /*
     listli2.forEach(function (item, index) {
      console.log("aaaaa list LI" + item);
     })
     */
 


   //  console.log("URL resuklt" + JSON.stringify(searchResult.response));


  }  

  private async invokeUrl(url: string): Promise<UrlResult> {
    const result: UrlResult = new UrlResult();
    result.date = new Date();
    result.url = url;
 //   try {
      result.response = await axios.get(url);
 //   } catch (e) {
 //     result.exception = util.inspect(e);
    //  console.error(e);
  //  }
    return result;
  }



}

