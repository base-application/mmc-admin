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
      cover: 'Cover'
    },
    timedRelease: 'Timed Release',
    publishNow: 'Publish Now',
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
      tab: 'Referral',
      model:{
        remark: 'Remark'
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
      tab: 'Thank',
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
        attendance: 'How to manage cash flow and risk 03 June 2021 8.00am',
        agentRole: 'Any representative? If yes, the representative name and role',
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
      eventEndTime: 'EventEndTime',
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
      disApprove: "DisApprove"
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
        loginName: "LoginName",
        expiredTime: 'ExpiredTime',
        credentialsExpiredTime:"CredentialsExpiredTime",
        locked:"Locked",
        enable: 'Enable',
        password: 'Password'
      }
    },
    role: {
      entity: {
        id: "ID",
        name: "Name"
      },
      button: {
        editApi: "Api",
        editMenu: "Menu",
        editButton: "Button"
      }
    },
    menu: {
      entity: {
        name: 'Name',
        menuIcon: 'MenuIcon',
        path: 'Path',
        component: 'Component',
        meta: 'Meta',
        priority: 'Priority',
        redirect: 'Redirect',
        hidden: 'Hidden'
      }
    },
    button: {
      entity: {
        modeName: 'ModeName',
        name: 'Name',
        buttonCode: 'ButtonCode'
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
        loginName: 'LoginName',
        requestIp: 'RequestIp',
        requestPath: 'RequestPath',
        requestMethod: 'RequestMethod',
        modular: 'Modular'
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
      enable: 'Enable',
      disable: 'Disable'
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