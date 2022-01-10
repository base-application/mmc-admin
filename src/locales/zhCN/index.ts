import common from './common'

export default Object.assign({}, common, {
  login: {
    title: '你好，欢迎使用',
    button: '登录'
  },
  advertisement: {
    entity: {
      advertisementLink: '链接',
      advertisementPoster: '图片',
      advertisementType: '类型',
      status: '发布'
    }
  },
  story: {
    entity: {
      title: '标题',
      pushTime: '日期',
      description: '描述',
      link: '链接',
      poster: '图片',
      cover: '封面',
      placeholder:{
        video:"请输入视频地址"
      }
    },
    timedRelease: '定时发布',
    publishNow: '立即发布',
    schedule: '发布时间',
    videoType: '视频',
    imageType: '图片'
  },
  slider: {
    entity: {
      createTime: '日期',
      sliderPoster: '图片',
      gradeName: '等级',
      group: '分组'
    }
  },
  referral: {
    referral: {
      status: {
        1: '发送',
        2: '接收成功',
        3: '接收失败'
      },
      tab: '推荐',
      model: {
        remark: '备注'
      },
      entity: {
        group: '分组',
        sendTime: '日期',
        name: '名字',
        note: '感谢信',
        value: 'Value (MYR)',
        picture: '名片',
        reason: '理由',
        status: '状态',
        remark: '备注'
      }
    },
    thank: {
      tab: '感谢',
      entity: {
        group: '分组',
        sendTime: '日期',
        name: '名字',
        note: '感谢',
        value: 'Value (MYR)',
        picture: '图片'
      }
    },
    from: '来自',
    to: '去向',
    search: {
      name: '姓名/联系方式'
    }
  },
  notification: {
    entity: {
      notificationTime: '日期',
      notificationTitle: '标题',
      grades: '等级',
      groups: '分组',
      notificationType: '类型',
      notificationContent: '内容',
      registrationName: '按钮名称',
      registrationLink: '链接'
    }
  },
  guideline: {
    entity: {
      guideLineTitle: '标题',
      guideLineImage: '封面'
    }
  },
  event: {
    list: {
      attendance: '出勤率',
      facebook: 'Facebook评论',
      entity: {
        name: '名称',
        gradeName: '等级',
        concatNumber: '联系方式',
        attendance: '出勤',
        agentRole: '代表',
        checkInTime: '签到时间',
        checkOutTime: '签退时间',
        absentReason: '缺席理由',
        comment: '评论'
      }
    },
    entity: {
      eventTitle: "标题",
      group: '分组',
      grade: '等级',
      eventDescription: '描述',
      eventStartTime: '开始时间',
      eventEndTime: '结束时间',
      eventLocation: '地点',
      eventMapLink: '链接',
      poster: "封面"
    },
    column: {
      date: '日期',
      list: "列表",
      qr: '二维码',
      listContent: "列表",
      attendance: "出勤率"
    },
    button: {
      approve: "批准",
      disApprove: "不批准"
    }
  },
  address: {
    country: {
      entity: {
        name: '名称'
      }
    },
    state: {
      entity: {
        name: '名称'
      }
    }
  },
  system: {
    user: {
      entity: {
        id: "ID",
        loginName: "用户名",
        expiredTime: '过期时间',
        credentialsExpiredTime: "登录过期时间",
        locked: "是否锁定",
        enable: '是否启用',
        password: '密码'
      }
    },
    role: {
      entity: {
        id: "ID",
        name: "名称"
      },
      button: {
        editApi: "配置权限",
        editMenu: "配置菜单",
        editButton: "配置按钮"
      }
    },
    menu: {
      entity: {
        name: '名称',
        menuIcon: '图标',
        path: '路径',
        component: '组件',
        meta: 'meta',
        priority: '排序',
        redirect: '重定向',
        hidden: '隐藏'
      }
    },
    button: {
      entity: {
        modeName: '模块名称',
        name: '名称',
        buttonCode: '按钮编码'
      }
    },
    white: {
      entity: {
        url: '路径'
      }
    },
    log: {
      entity: {
        logId: 'ID',
        loginName: '用户',
        requestIp: '请求IP',
        requestPath: '请求路径',
        requestMethod: '请求方式',
        modular: '模块'
      }
    }
  },
  group: {
    entity: {
      groupId: '分组ID',
      groupName: '分组名称'
    }
  },
  user: {
    placeholder: {
      name: '姓名/电话'
    },
    button: {
      enable: '启用',
      disable: '停用'
    },
    entity: {
      picture: '头像',
      name: '姓名',
      gradeId: '会员',
      groupId: '分组',
      positionId: '职级',
      member: "会员/游客",
      concatNumber: "联系方式",
      industry: "行业",
      country: "国家",
      state: "省",
      attendance: "出勤率",
      referralSend: "推荐发送",
      referralReceived: "推荐接收",
      thankYouNote: "感谢信",
      birthday: "生日",
      occupation: "职业",
      introduction: "介绍",
      whatsapp: "WhatsApp",
      facebook: "脸书",
      linkedin: "链接",
      youtube: "YouTube",
      instagram: "Instagram",
      companyVos: "公司"
    }
  }
})
