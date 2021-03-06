//who is providing internet?
//how much do they charge?
//what is the average speed per cost bracket?
//how good is their service? (averages)
//how do their ads stack up against their actual service?
//since speed has been increasing significantly over the past few years, we'll also
//display average load times for different months in the year to see if we can
//observe and trends

(function(module) {

  var participants = {};
  var averagesAndTotals = {};

  participants.allParticipants = [];

  function Participant(opts) {
    this.id = parseInt(opts.id),
    this.actual_download = parseInt(opts.actual_download),
    this.actual_upload = parseInt(opts.actual_upload),
    //doesnt really work - not much data here
    // this.advertised_download = parseInt(opts.advertised_download),
    // this.advertised_upload = parseInt(opts.advertised_upload),
    this.connection_type = opts.connection_type,
    this.cost_of_service = opts.cost_of_service,
    this.date_pretty = new Date(opts.date_pretty),
    this.isp = opts.isp,
    this.isp_user = opts.isp_user,
    this.min_rtt = parseInt(opts.min_rtt),
    this.timestamp = parseInt(opts.timestamp),
    this.seattle_blkgrpce10 = opts.seattle_blkgrpce10
  };

  Participant.prototype.toHtml = function(scriptTemplateId) {
    var template = Handlebars.compile($(scriptTemplateId).html());
    return template(this);
  };

//this probably belongs in a 'view' file
  participants.renderHomePage = function() {
    participants.allParticipants.forEach(function(a){
      $(".showData").append(a.toHtml("#aggregate-isp-info"));
    });
  };

  // participants.comcastView = function(){
  //   make ajax call to api to get all comcast info - can i sort by these params?
  //
  //
  //
  // };

  //end view file functions




  //average speed section
  participants.summaryView = function(){
    participants.generalCall();

    //first part of summaryView
    var lowestPrice = [];
    var lowerMidPrice = [];
    var higherMidPrice = [];
    var highestPrice = [];
    participants.allParticipants.forEach(function(a){
      if(a.cost_of_service === '25_50'){
        lowestPrice.push(a);
      } else if(a.cost_of_service === '50_75'){
        lowerMidPrice.push(a);
      } else if(a.cost_of_service === '75_100'){
        higherMidPrice.push(a);
      } else if(a.cost_of_service === '100_or_above'){
        highestPrice.push(a);
      } else{
        console.log('mmmmmm');
      }
    });
    console.log(lowestPrice.length, 'lowestPrice array');
    console.log(lowerMidPrice.length, 'lowerMidPrice array');
    console.log(higherMidPrice.length, 'higherMidPrice array');
    console.log(highestPrice.length, 'highestPrice array');
    //end first part of summaryView
    //second part of summaryView
    /////////////////////////////////
    //low price info
    var lowPriceComcast = [];
    // var lowPriceComcastUploads = [];
    var lowPriceComcastUp = 0;
    // var lowPriceComcastDownloads = []
    var lowPriceComcastDown = 0;
    //centurylink low price info
    var lowCenturylink = [];
    var lowPriceCentUp = 0;
    // var lowCenturylinkUploads = [];
    var lowPriceCentDown = 0;
    // var lowCenturylinkDownloads = [];
    //wave low price info
    var lowWave = [];
    var lowWaveUploads = [];
    var lowWaveUp = 0;
    // var lowWaveDownloads = [];
    var lowWaveDown = 0;
    //other Isps low price info
    var lowOther = [];
    // var lowOtherUploads = [];
    var lowOtherUp = 0;
    // var lowOtherDownloads = [];
    var lowOtherDown = 0;
    lowestPrice.forEach(function(a){
      if(a.isp === 'comcast' || a.isp_user === 'comcast'){
        lowPriceComcast.push(a);
        lowPriceComcastUp += parseInt(a.actual_upload);
        lowPriceComcastDown += (a.actual_download);
      } else if (a.isp === 'centurylink' || a.isp_user === 'centurylink'){
        lowCenturylink.push(a);
        lowPriceCentUp += parseInt(a.actual_upload);
        lowPriceCentDown += parseInt(a.actual_download);
      } else if(a.isp === 'wave' || a.isp_user === 'wave'){
        lowWave.push(a);
        lowWaveUploads.push(a.actual_upload);
        lowWaveUp += parseInt(a.actual_upload);
        lowWaveDown += parseInt(a.actual_download);
      } else {
        lowOther.push(a);
        lowOtherUp += parseInt(a.actual_upload);
        lowOtherDown += parseInt(a.actual_download);
      }
    });
    //some of this data is messed up...the upload times for Wave customers is whack.
    console.log(lowWaveUploads);
    console.log('Of the ' + lowestPrice.length +' participants paying $25-$50 per month for their internet, ' + lowPriceComcast.length + ' are Comcast customers. Their average upload time is ' + (lowPriceComcastUp/lowPriceComcast.length) + '. Their average download time is ' + (lowPriceComcastDown/lowPriceComcast.length) + '.'  + lowCenturylink.length + ' are Centurylink customers. Their average upload time is ' + (lowPriceCentUp/lowCenturylink.length) + '. Their average download time is ' + (lowPriceCentDown/lowCenturylink.length) + '. ' + lowWave.length +  ' are Wave customers. They get about ' + (lowWaveUp/lowWave.length) + ' Mpbs of upload and ' + (lowWaveDown/lowWave.length) + ' Mbps of download.');


  };
  //end averge speed section

participants.onlyUploadAndDownloadTotals = function(){
  var totalUp = 0;
  var totalDown = 0;
  participants.allParticipants.forEach(function(a){
    totalUp += a.actual_upload;
    totalDown += a.actual_download;
  });
  console.log(totalUp);
  console.log(totalDown);
}


//sort array depending on cost of service
  participants.sortCosts = function(array){
      var lowestPriceRange = [];
      var lowerMiddlePriceRange = []
      var middlePriceRange = [];
      var highPriceRange = [];
      var notProvidedRange = [];
    array.forEach(function(obj){
      if (obj.cost_of_service === '25_50'){
        lowestPriceRange.push(obj);
      } else if (obj.cost_of_service === '50_75'){
        lowerMiddlePriceRange.push(obj);
      } else if (obj.cost_of_service === '75_100'){
        middlePriceRange.push(obj);
      } else if (obj.cost_of_service === '100_or_above'){
        highPriceRange.push(obj);
      } else {
        notProvidedRange.push(obj);
      }
    });
    console.log(lowestPriceRange.length);
    console.log(lowerMiddlePriceRange.length);
    console.log(middlePriceRange.length);
    console.log(highPriceRange.length);
    console.log(notProvidedRange.length);
  };

//create array which adds upload and download times based on name, and divides
//them by the total number of elements in the arrays
 participants.getAverages = function(array){
      var actual_upload = 0;
      var actual_download = 0;
      var length = array.length;
      var averageUpload;
      var averageDownload;
     array.forEach(function(a, b){

       var uploaded = (isNaN(a.actual_upload)) ? 0 : parseInt(a.actual_upload);
       var downloaded = (isNaN(a.actual_download)) ? 0 : parseInt(a.actual_download);
       actual_upload += uploaded;
       actual_download += downloaded;

     });
     averageUpload = parseInt(actual_upload / array.length);
     averageDownload = parseInt(actual_download / array.length);
     console.log(averageUpload + ' Mbps', 'upload average.', averageDownload + ' Mbps', 'download average.');
 };
//end average counter

//write a function which keeps track of each isps market share
participants.marketShare = function(){
  participants.countIsps();
  function compareNumbers(a, b) {
    return b - a;
  };

  var comcast = participants.comcast;
  var centurylink = participants.centurylink;
  var wave = participants.wave;
  var otherIsps = participants.otherIsps;

  var sorted = [];
  sorted.push(comcast.length);
  sorted.push(centurylink.length);
  sorted.push(wave.length);
  sorted.push(otherIsps.length);
  sorted = (sorted.sort(compareNumbers));
  console.log(sorted);

  var first;
  var second;

  if( comcast.length === sorted[0] ){
    $('.showData').append('Comcast has the most customers with approximately ' + parseInt((comcast.length/participants.allParticipants.length) * 100) + '% of the market. ');
  } else if ( centurylink.length === sorted[0] ) {
    $('.showData').append('Centurylink has the most customers with approximately ' + parseInt((centurylink.length/participants.allParticipants.length) * 100) + '% of the market. ');
  } else if ( wave.length === sorted[0] ) {
    $('.showData').append('Wave has the most customers with approximately ' + parseInt((wave.length/participants.allParticipants.length) * 100) + '% of the market. ');
  } else if ( otherIsps.length === sorted[0] ) {
    $('.showData').append('An assortment of small isps have the majority of customers in Seattle with approximately ' + parseInt((otherIsps.length/participants.allParticipants.length) * 100) + '% of the market. ');
  } else {
    console.log('something is wrong');
  }
  if( comcast.length === sorted[1] ){
    var isp = 'comcast';
    $('.showData').append('Comcast has the second most customers in Seattle with approximately ' + parseInt((comcast.length/participants.allParticipants.length) * 100) + '% of the market. ');
  } else if ( centurylink.length === sorted[1] ) {
    var isp = 'centurylink';
    $('.showData').append('Centurylink has the second most customers in Seattle with approximately ' + parseInt((centurylink.length/participants.allParticipants.length) * 100) + '% of the market. ');
  } else if ( wave.length === sorted[1] ) {
    var isp = 'wave';
    $('.showData').append('Wave has the second most customers in Seattle with approximately ' + parseInt((wave.length/participants.allParticipants.length) * 100) + '% of the market. ');
  } else if ( otherIsps.length === sorted[1] ) {
    var isp = 'other ISPs';
    $('.showData').append('An assortment of small isps have the second most of customers in Seattle with approximately ' + parseInt((otherIsps.length/participants.allParticipants.length) * 100) + '% of the market. ');
  } else {
    console.log('something is wrong');
  }

}

//create arrays based on isp name
  participants.countIsps = function (){

     participants.comcast = participants.allParticipants.filter(function(obj){
      return (obj.isp === 'comcast' || obj.isp_user === 'comcast');
    });
     participants.centurylink = participants.allParticipants.filter(function(obj){
      return (obj.isp === 'centurylink' || obj.isp_user === 'centurylink');
    });
    participants.wave = participants.allParticipants.filter(function(obj){
     return (obj.isp === 'AS11404 vanoppen.biz LLC' || obj.isp === 'wave' || obj.isp_user === 'wave');
   });
    participants.otherIsps = participants.allParticipants.filter(function(obj){
      return (obj.isp !== 'comcast' && obj.isp !== 'centurylink' && obj.isp !== 'AS11404 vanoppen.biz LLC' && obj.isp !== 'wave' && obj.isp_user !== 'comcast' && obj.isp_user !== 'centurylink' && obj.isp_user !== 'wave');
    });
    console.log(participants.comcast.length, 'comcast');
    console.log(participants.centurylink.length, 'centurylink');
    console.log(participants.wave.length, 'wave');
    console.log(participants.otherIsps.length, 'others');
  }
//end

  //inputData is the data from the API. This function sorts it, then assigns each Object
  //to a Participants object, and puts them all in an array called participants.allParticipants.
  participants.loadAll = function(inputData) {
      participants.allParticipants = inputData.sort(function(a,b) {
          return (new Date(b.date_pretty)) - (new Date(a.date_pretty));
        }).map(function(ele) {
        return new Participant(ele);
      });
    };

  participants.generalCall = function(){
    //example of basic call to api
    var limit = '&$limit=5000';
    $.ajax({
      url: 'https://data.seattle.gov/resource/v9zk-3thk.json?' + limit,
      type: 'GET',
      success: function(data){
        participants.loadAll(data);
        console.log(data);
      }
    });
};

 participants.generalCall();
 // participants.countIsps();
 // participants.marketShare();
 module.participants = participants;

})(window);
