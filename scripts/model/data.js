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



//create array which adds upload and download times based on name, and divides
//them by the total number of elements in the arrays
 participants.getAverages = function(array){
      var actual_upload = 0;
      var actual_download = 0;
      var length = array.length;
     array.forEach(function(a, b){

       var uploaded = (isNaN(a.actual_upload)) ? 0 : parseInt(a.actual_upload);
       var downloaded = (isNaN(a.actual_download)) ? 0 : parseInt(a.actual_download);
       actual_upload += uploaded;
       actual_download += downloaded;

     });
     console.log(parseInt((actual_upload)/length), 'upload average');
     console.log(parseInt(actual_download/length), 'download average');
 };
//end average counter



//create arrays based on isp name
  participants.countIsps = function (){
     participants.comcast = participants.allParticipants.filter(function(obj){
      return obj.isp === 'comcast';
    });
     participants.centurylink = participants.allParticipants.filter(function(obj){
      return obj.isp === 'centurylink';
    });
     participants.otherIsps = participants.allParticipants.filter(function(obj){
      return (obj.isp !== 'comcast' && obj.isp !== 'centurylink');
    });
    console.log(participants.comcast.length, 'comcast');
    console.log(participants.centurylink.length, 'centurylink');
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
 module.participants = participants;

})(window);
