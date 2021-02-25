'use strict';

//var MyUserId = MyData.user.id;
//var TestType = websiteUse ? 'GET' : 'POST';
//var urlThis = urlcon[mm][webUrl];
//var urlName = location.hostname;
/*
var URL_select = handUrl_h + urlThis.select_url;
var URL_create = handUrl_h + urlThis.create_url;
var URL_del = handUrl_h + urlThis.del_url;
var URL_up = handUrl_h + urlThis.update_url;*/

var house_url="https://buy.yungching.com.tw/house/4657625";


var tsm = new Date().toTimeString();
var nIdex = tsm.search('GMT');
var gmt = tsm.substr(nIdex, 4);
var intMes = parseInt(tsm.substr(nIdex + 4, 2));
var Qtime = gmt + intMes;

console.log(Qtime);


let users = [];


var app = new Vue({
  el: '#download_page_row',
  data: {
    company: MyUserId,
    action: "",
    select_url: [],
    create_url:[],
    readDD: {
      json_data: {}
    },
    switchIndex: false,
    index: "",
    timeZone: Qtime,
    switch: "",
    pickIndex: 0,
    //
    url_data : [],
    users: users,
    showResult:"",
    isShow: false,
  },
  computed: {},
  components: {
    // DateTimePicker: DateTimePicker
  },
  created: function created() {
    this.action = "0";
    this.getApp();
  },
  methods: {
    getApp: function() {
      var self = this;

      /*var saveDD = {
        company: this.company,
        index: this.index,
        action: this.action,
        timeZone: this.timeZone,
        switch: this.switch
      };*/

      console.log(saveDD);
      $.ajax({
        type: "GET",
        url: house_url,
        async: true,
        crossDomain: true,
        data: ""
      }).done(function (data) {

        console.log(data);
        self.url_data = data.agent;
        

      }).fail(function (jqXHR, textStatus, errorThrown) {

        console.log(jqXHR);
        swal("查询失败，请联络客服!");
      });
    },
    delfun: function(click_id) {
      //console.log(click_id);//後端資料表的id
      
      var saveDD = {
        company: this.company,
        action: this.action,
        id:click_id
      };

      $.ajax({
        type: "POST",
        url: URL_del,
        async: true,
        dataType: "json",
        crossDomain: true,
        data: saveDD 
      }).done(function (data) {

        console.log(data);

        if(data.message=='success'){
          alert("刪除成功!");

        }

      }).fail(function (jqXHR, textStatus, errorThrown) {

        console.log(jqXHR);
        swal("新增失败，请联络客服!");
        
      });


      window.location.reload();

    },
    editfun(index) {

      var text_text_agent_name = this.$refs.text_agent_name[index]; 
      text_text_agent_name.hidden =true;
      var text_text_apkurl = this.$refs.text_apkurl[index]; 
      text_text_apkurl.hidden =true;
      var text_text_ipaurl = this.$refs.text_ipaurl[index]; 
      text_text_ipaurl.hidden =true;
      var text_text_qrcodeurl = this.$refs.text_qrcodeurl[index]; 
      text_text_qrcodeurl.hidden =true;

      var edit_btn = this.$refs.edit[index];
      edit_btn.hidden =true;


      if(text_text_agent_name.hidden &&
        text_text_apkurl.hidden &&
        text_text_ipaurl&&
        text_text_qrcodeurl) {

        var input_text_agent_name = this.$refs.input_agent_name[index];
        input_text_agent_name.hidden=false;

        var input_text_apkurl = this.$refs.input_apkurl[index];
        input_text_apkurl.hidden=false;

        var input_text_ipaurl = this.$refs.input_ipaurl[index];
        input_text_ipaurl.hidden=false;

        var input_text_qrcodeurl = this.$refs.input_qrcodeurl[index];
        input_text_qrcodeurl.hidden=false;

        var save_btn =this.$refs.up[index];
        save_btn.hidden=false;

      }

      console.log('id'+input_text);

    },
    updatefun(data_id,row_index){

      let self = this; 
      var self_url_data=self.url_data;

      var apkurl_= self_url_data[row_index].url["apkurl"];
      console.log(apkurl_);

      var saveDD = {
        company: this.company,
        action: this.action,
        id:data_id,
        agent_name: self_url_data[row_index].agent_name,
        apkurl: self_url_data[row_index].url["apkurl"],
        ipaurl: self_url_data[row_index].url["ipaurl"],
        qrcodeurl: self_url_data[row_index].url["qrcodeurl"]
      };


      $.ajax({
        type: "POST",
        url: URL_up,
        async: true,
        dataType: "json",
        crossDomain: true,
        data: saveDD 
      }).done(function (data) {


        if (data.message=='NameRepead'){
          alert("新增失敗!名稱不可重複");

        }
        if(data.message=='success'){
          alert("修改成功!");

        }
      }).fail(function (jqXHR, textStatus, errorThrown) {

        console.log(jqXHR);
        swal("修改失败，请联络客服!");
      });

      window.location.reload();

    },
    creatnew:function(){
      let v_id = Date.now();//產生一個畫面用的不重複id
      this.users.push({ agent_name: "", apkurl: "", ipaurl: "", qrcodeurl:""});//新增資料到陣列就好，不必組html字串
    },
    DeleteRow: function (user,index) {

      let self = this;
      let delIndex=index;
      //從集合中刪除物件
      self.users.splice(delIndex, 1);//刪除資料，畫面會跟著變動

  },
    savenew: function () {

      let self = this; 
      //self.showResult =  JSON.stringify(self.users);//序列化JSON字串
      var self_users=self.users;

      var saveDD = {
        company: this.company,
        action: this.action,
        agent_name: self_users[0].agent_name,
        apkurl: self_users[0].apkurl,
        ipaurl: self_users[0].ipaurl,
        qrcodeurl: self_users[0].qrcodeurl
      };

      $.ajax({
        type: "POST",
        url: URL_create,
        async: true,
        dataType: "json",
        crossDomain: true,
        data: saveDD 
      }).done(function (data) {

        if (data.message=='NameRepead'){
          alert("新增失敗!名稱不可重複");

        }
        if(data.message=='success'){
          alert("新增成功!");

        }

        window.location.reload();

      }).fail(function (jqXHR, textStatus, errorThrown) {

        console.log(jqXHR);
        swal("新增失败，请联络客服!");
      });

}
  }
});