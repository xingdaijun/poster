//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isSuccess:false,
    arr:[1,2,3,4,5,6,7,8,9,10,11,12,13],
    appid:"",
    appsecret:"",
  },
  open:function(){
    this.setData({
      isSuccess: true
    })
  },
  close:function(){
    this.setData({
      isSuccess:false
    })
  },
  //事件处理函数
  onLoad: function () {
    this.getAppMsg();
  },
  getAppMsg:function(){
    var that=this;
    wx.request({
      url: 'https://live.tealg.com/api/wxapi/wx_HelpPay.aspx',
      method:"POST",
      data:{
        'flag':'getAppMsg',
        'appSecret':'3a3b1f1113d022af5791daaff54c2f81'
      },
      success(res){
        console.log(res.data);
        that.setData({
          appid: res.data.AppID,
          appsecret: res.data.AppSecret
        })
        that.login();
      }
    })
  },
  login:function(){
    var appid=this.data.appid;
    var appsecret=this.data.appsecret;
    wx.login({
      success(res) {
        console.log(res.code);
        if (res.code) {
          // 发起网络请求
          wx.request({
            method:'POST',
            url: 'https://live.tealg.com/api/wxapi/wx_HelpPay.aspx',
            data: {
              flag:"authCode",
              code:res.code,
              appSecret:'3a3b1f1113d022af5791daaff54c2f81'
            },
            success(res){
              console.log(res.data)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})
