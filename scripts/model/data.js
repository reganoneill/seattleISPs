(function(module) {

  var participants = {};
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
    this.date_pretty = opts.date_pretty,
    this.isp = opts.isp,
    this.isp_user = opts.isp_user,
    this.min_rtt = parseInt(opts.min_rtt),
    this.timestamp = parseInt(opts.timestamp),
    this.seattle_blkgrpce10 = opts.seattle_blkgrpce10
  };

  //inputData is the data from the API. This function sorts it, then assigns each Object
  //to a Participants object, and puts them all in an array called participants.allParticipants.
    participants.loadAll = function(inputData) {
      participants.allParticipants = inputData.sort(function(a,b) {
          return (new Date(b.date_pretty)) - (new Date(a.date_pretty));
        }).map(function(ele) {
        return new Participant(ele);
      });
    };


//  traffic.loadAll = function(inputData) {
//    traffic.allTraffic = inputData.sort(function(a,b) {
//     return (new Date(b.date_pretty)) - (new Date(a.date_pretty));
//   }).map(function(ele) {
//     return new Traffic(ele);
//   });
//   // console.log(traffic.allTraffic);
// };

   participants.generalCall = function(){
    //example of basic call to api
    $.ajax({
      url: 'https://data.seattle.gov/resource/v9zk-3thk.json',
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
