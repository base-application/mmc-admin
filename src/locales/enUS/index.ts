import common from './common'

export default Object.assign({}, common, {
  login: {
    title: 'Hello, Welcome',
    button: 'Login'
  },
  advertisement:{
    entity:{
      advertisementLink: 'Link',
      advertisementPoster: 'Poster',
      advertisementType: 'Type',
      status: 'Status'
    }
  },
  story:{
    entity: {
      title: 'Title',
      pushTime: 'Date',
      description: 'Description',
      link: 'Video',
      poster: 'Poster',
      cover: 'cover'
    },
    timedRelease: 'timed Release',
    publishNow: 'publish Now',
    schedule: 'Schedule date and time',
    videoType: 'Video',
    imageType: 'Image'
  },
  slider:{
    entity: {
      createTime: 'Date',
      sliderPoster: 'Poster',
      gradeName: 'MemberShip',
      group: 'Group'
    }
  },
  referral:{
    referral: {
      tab: 'referral',
      model:{
        remark: 'remark'
      },
      entity: {
        group: 'Group',
        sendTime: 'Date',
        name: 'Name',
        note: 'Thank you note',
        value: 'Value (MYR)',
        picture: 'Namecard',
        reason: 'Reason',
        status: 'Status',
        remark: 'Remark'
      }
    },
    thank: {
      tab: 'thank',
      entity: {
        group: 'Group',
        sendTime: 'Date',
        name: 'Name',
        note: 'Thank you note',
        value: 'Value (MYR)',
        picture: 'Receipt'
      }
    },
    from: 'From',
    to: 'To',
    search: {
      name: 'name/phone'
    }
  },
  notification: {
    entity: {
      notificationTime: 'Date',
      notificationTitle: 'Title',
      grades: 'Membership',
      groups: 'Groups',
      notificationType: 'Type',
      notificationContent: 'Content',
      registrationName: 'Registration button name (if any)',
      registrationLink: 'Registration button link (if any)'
    }
  },
  guideline:{
    entity: {
      guideLineTitle: 'Title',
      guideLineImage: 'Poster'
    }
  },
  event:{
    list:{
      attendance: 'Attendance',
      facebook: 'Facebook Comment',
      entity: {
        name: 'Name',
        gradeName: 'Grade',
        concatNumber: 'Concat Number',
        attendance: 'Attendance',
        agentRole: 'AgentRole',
        checkInTime: 'CheckInTime',
        checkOutTime: 'CheckOutTime',
        absentReason: 'AbsentReason',
        comment: 'Comment'
      }
    },
    entity:{
      eventTitle: "Title",
      group: 'Group',
      grade: 'Grade',
      eventDescription: 'EventDescription',
      eventStartTime: 'EventStartTime',
      eventEndTime: 'eventEndTime',
      eventLocation: 'EventLocation',
      eventMapLink: 'EventMapLink',
      poster: "Poster"
    },
    column: {
      date: 'Date',
      list: "Performance listing",
      listContent: "listing",
      attendance: "Attendance"
    },
    button: {
      approve: "Approve",
      disApprove: "disApprove"
    }
  },
  address: {
    country: {
      entity: {
        name: 'name'
      }
    },
    state: {
      entity: {
        name: 'name'
      }
    }
  },
  system: {
    user:{
      entity: {
        id: "ID",
        loginName: "loginName",
        expiredTime: 'expiredTime',
        credentialsExpiredTime:"credentialsExpiredTime",
        locked:"locked",
        enable: 'enable',
        password: 'password'
      }
    },
    role: {
      entity: {
        id: "ID",
        name: "name"
      },
      button: {
        editApi: "Api",
        editMenu: "Menu",
        editButton: "Button"
      }
    },
    menu: {
      entity: {
        name: 'name',
        menuIcon: 'menuIcon',
        path: 'path',
        component: 'component',
        meta: 'meta',
        priority: 'priority',
        redirect: 'redirect',
        hidden: 'hidden'
      }
    },
    button: {
      entity: {
        modeName: 'modeName',
        name: 'name',
        buttonCode: 'buttonCode'
      }
    },
    white: {
      entity: {
        url: 'Url'
      }
    },
    log: {
      entity: {
        logId: 'ID',
        loginName: 'loginName',
        requestIp: 'requestIp',
        requestPath: 'requestPath',
        requestMethod: 'requestMethod',
        modular: 'modular'
      }
    }
  },
  group:{
    entity:{
      groupId: 'Group Id',
      groupName: 'Group Name'
    }
  },
  user: {
    placeholder: {
      name: 'Name / Phone Number'
    },
    button: {
      enable: 'enable',
      disable: 'disable'
    },
    entity: {
      picture: 'Profile picture',
      name: 'Name',
      gradeId: 'Membership',
      groupId: 'Group',
      positionId: 'Grade',
      member: "Member / Guest",
      concatNumber: "Contact Number",
      industry: "Industry",
      country: "Country",
      state: "State",
      attendance: "Attendance",
      referralSend: "Referral sent",
      referralReceived: "Referral received",
      thankYouNote: "Thank you note",
      birthday: "Date of birth",
      occupation: "Occupation",
      introduction: "Self introduction",
      whatsapp: "Whatsapp",
      facebook: "Facebook",
      linkedin: "Linkedin",
      youtube: "Youtube channel",
      instagram: "Instagram",
      companyVos: "Business Profile"
    }
  }
})