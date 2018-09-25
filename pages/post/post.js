
Page({
  /**
   * 页面的初始数据
   */
  data: {
    images: [],//临时图片地址
    imgs:[],
    resimgUrl: [], //返回图片的url
    upImgUrl: 'http://47.88.51.97/updateImage',//上传图片服务器地址
    count: 6,
    title: '',
    desc: '',
    price: 0.00,
    index : 0,
    percent: 0
  },
  onLoad: function (options) {
    console.log(this.data.imgs);
  },
  previewImage: function (e) {
    console.log("preview");
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.imgs.path // 需要预览的图片http链接列表
    })
  },
  deleteImg: function(e){
    let imgs = this.data.imgs;
    let resimg = this.data.resimgUrl;
    var index = e.currentTarget.dataset.index; 
    imgs.splice(index, 1);
    resimg.splice(index,1);
    this.data.index--;
    console.log("index:"+this.data.index);
    this.setData({
      imgs: imgs,
      resimgUrl: resimg
    });
    console.log(this.data.imgs);
    console.log(this.data.resimgUrl);
  },
  uploaditem: function (e) {
    console.log(this.data.desc);
    var that = this;
    wx.request({
      url: 'http://47.88.51.97/update',
      method: 'post', 
      data: {
        'title': that.data.title,
        'description': that.data.desc,
        'price': that.data.price,
        'image': JSON.stringify(that.data.resimgUrl)
      },
      success(res) {
        const data = res.data
        console.log(data);
        //do something
      }
    })

  },

  desc_blur(data){
    console.log(data.detail.detail.value);
    this.setData({
      desc: data.detail.detail.value
    });
  },

  chooseImage: function () {
    console.log(this.data.imgs);
    var that = this;
    wx.chooseImage({
      count: 6,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res); 
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          var obj = {};
          obj.path = res.tempFilePaths[i];
          obj.percent = 0;
          console.log("obj:" + obj);
          let imgs = that.data.imgs;
          imgs.push(obj);
          that.setData({ imgs: imgs });
        }
        console.log("push:");
        console.log(that.data.imgs);

        if (that.data.imgs.length > 0) {
          that.uploadimg({
            url: that.data.upImgUrl,//这里是你图片上传的接口
            images: that.data.imgs//这里是选取的图片的地址数组
          });
        } else {
          console.log("没有可上传的文件");
        }
      }
    })
  },

  uploadimg: function(data) {
    var that = this;
    var i = data.i ? data.i : this.data.index,//要上传的图片
    // var i = that.index;
    success = data.success ? data.success : 0,//上传成功的个数
    fail = data.fail ? data.fail : 0;//上传失败的个数
    const uploadTask=wx.uploadFile({
      url: data.url, //开发者服务器 url
      filePath: data.images[i].path,
      name: 'image',
      success: function (res) {
        var resImg = {}
        resImg.url=res.data
        let resimgUrl = that.data.resimgUrl;
        resimgUrl.push(resImg);
        console.log(res);
        const resdata = res.data;
        that.setData({resimgUrl});  
        console.log(that.data.resimgUrl);
        success++;
        //do something
      },
      fail: function () {
        fail++;
      },
      complete: function () {
        i++;
        that.data.index++;
        console.log("index:" + that.data.index);
        if (i == data.images.length) {
          console.log("success：" + success + "fail" + fail);
        } else {
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }
      }
    })
    uploadTask.onProgressUpdate((res) => {
      var imgpercent = 'imgs[' + i + '].percent';
      console.log("progress index:"+i);
      console.log('上传进度', res.progress)
      this.setData({
        [imgpercent] : res.progress
      });
      console.log(that.data.imgs);
    })
  }, 

  handleAdd() {
    if (this.data.percent === 100) return;
    this.setData({
      percent: this.data.percent + 10
    });

  }

})

// function uploadimg(data) {
//   console.log(data.url);
//   var that = this;
//   var i = data.i ? data.i : 0,//要上传的图片
//     success = data.success ? data.success : 0,//上传成功的个数
//     fail = data.fail ? data.fail : 0;//上传失败的个数
//   wx.uploadFile({
//     url: data.url, //开发者服务器 url
//     filePath: data.path[i],
//     name: 'image',
//     formData: {
//       // 'title': data.title,
//       // 'description':data.desc,
//       // 'price': data.price
//       'image': data.path[0],
//       'image': data.path[1],

//     },
//     success: function (res) {
//       console.log(res);
//       success++;
//       //do something
//     },
//     fail: function () {
//       fail++;
//     },
//     complete: function () {
//       i++;
//       if (i == data.path.length) {
//         console.log("success：" + success + "fail" + fail);
//       } else {
//         data.i = i;
//         data.success = success;
//         data.fail = fail;
//         uploadimg(data);
//       }
//     }
//   })
// }