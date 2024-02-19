/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Formikform from "../../../../Components/ExtraComponents/Form/Formik_form1"
import { useFormik } from 'formik';
import * as  valid_err from "../../../../Utils/Common_Messages"
import { useNavigate, useLocation } from "react-router-dom";
import { Email_regex, Mobile_regex, Name_regex } from "../../../../Utils/Common_regex"
import { useDispatch, useSelector } from "react-redux";
import Content from '../../../../Components/Dashboard/Content/Content';
import { GET_ALL_GROUP_SERVICES, Find_One_User, Update_User } from '../../../../ReduxStore/Slice/Admin/AdminSlice';
import { Get_All_SUBADMIN } from '../../../../ReduxStore/Slice/Subadmin/Subadminslice'
import { Get_All_Service_for_Client } from '../../../../ReduxStore/Slice/Common/commoSlice'
import { Get_Service_By_Group_Id } from '../../../../ReduxStore/Slice/Admin/GroupServiceSlice';
import { check_Device } from "../../../../Utils/find_device";
import toast, { Toaster } from 'react-hot-toast';
import ToastButton from "../../../../Components/ExtraComponents/Alert_Toast";
import "../../../../App.css"
import { f_time } from '../../../../Utils/Date_formet';
import { All_Api_Info_List } from '../../../../ReduxStore/Slice/Superadmin/ApiCreateInfoSlice';
import * as Config from "../../../../Utils/Config";

const AddClient = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()


  const user_token = JSON.parse(localStorage.getItem("user_details")).token
  const Role = JSON.parse(localStorage.getItem("user_details")).Role
  const user_id = JSON.parse(localStorage.getItem("user_details")).user_id


  const [UserData, setUserData] = useState({
    loading: true,
    data: []
  });


  const [selectedStrategies, setSelectedStrategies] = useState([]);
  const [ShowAllStratagy, setShowAllStratagy] = useState(true)
  const [GetBrokerInfo, setGetBrokerInfo] = useState([]);


  const [first, setfirst] = useState([])




  const [AllGroupServices, setAllGroupServices] = useState({
    loading: true,
    data: []
  });

  const [Addsubadmin, setAddsubadmin] = useState({
    loading: true,
    data: []
  });


  const [AllStrategy, setAllStrategy] = useState({
    loading: true,
    data: []
  });


  const [GetServices, setGetServices] = useState({
    loading: true,
    data: []
  });


  const isValidEmail = (email) => {
    return Email_regex(email)
  }
  const isValidContact = (mobile) => {
    return Mobile_regex(mobile)
  }

  const isValidName = (mobile) => {
    return Name_regex(mobile)
  }





  // GET USER DETAILS
  const data_1 = async () => {
    await dispatch(Find_One_User({ 'id': location.state._id })).unwrap()
      .then((response) => {
        if (response.status) {
          setUserData({
            loading: false,
            data: response
          });
        }
      })
  }


  useEffect(() => {
    data_1()
  }, [])



  const formik = useFormik({
    initialValues: {
      username: null,
      fullName: null,
      email: null,
      mobile: null,
      broker: null,
      licence: null,
      groupservice: null,
      service_given_month: '0',
      parent_id: null,
      strategies: [],
      tomonth: null,
      todate: null,
      fromDate: null,
      app_id: 'null',
      api_type: 'null',
      client_code: 'null',
      api_key: 'null',
      api_secret: 'null',
      app_key: 'null',
      demat_userid: 'null',
      parent_role: null,
      Strategy: false,
      licence1: 'null',
      multiple_strategy_select: false
    },



    validate: (values) => {


      const errors = {};
      if (!values.username) {
        errors.username = valid_err.USERNAME_ERROR;
      }
      if (!values.fullName) {
        errors.fullName = valid_err.FULLNAME_ERROR;
      }
      else if (!isValidName(values.fullName)) {
        errors.fullName = valid_err.INVALID_ERROR;
      }
      if (!values.mobile) {
        errors.mobile = valid_err.CONTACT_ERROR;
      } else if (!isValidContact(values.mobile)) {
        errors.mobile = valid_err.INVALID_CONTACT_ERROR;
      }
      if (!values.licence) {
        errors.licence = valid_err.LICENCE_TYPE_ERROR;
      }
      else if (values.licence === '2' || values.licence === 2) {
        if (!values.broker) {
          errors.broker = valid_err.BROKER_ERROR;
        }
        
      }
      else if (values.licence === '0' || values.licence === 0) {
        if (!values.broker) {
          errors.broker = valid_err.BROKER_ERROR;
        }
        
      }
      else if (values.licence === '1' || values.licence === 1) {
        
      }
      if (!values.groupservice) {
        errors.groupservice = valid_err.GROUPSELECT_ERROR;
      }
      if (selectedStrategies.length === 0) {
        errors.Strategy = "select strategy";
      }

      if (!values.email) {
        errors.email = valid_err.EMPTY_EMAIL_ERROR;
      } else if (!isValidEmail(values.email)) {
        errors.email = valid_err.INVALID_EMAIL_ERROR;
      }

      return errors;
    },
    onSubmit: async (values) => {

      const req = {
        "FullName": values.fullName,
        "UserName": values.username,
        "Email": values.email,
        "PhoneNo": values.mobile,
        "licence1": values.tomonth,
        "license_type": values.licence,
        "Strategies": selectedStrategies.filter((item) => item.checked === true),
        "fromdate": values.fromDate,
        "todate": values.todate,
        "service_given_month": values.service_given_month,
        "broker": values.broker,
        "parent_id": values.parent_id == null || values.parent_id === "" ? user_id : values.parent_id,
        "parent_role": values.parent_id == null || values.parent_id === "" ? "ADMIN" : "SUBADMIN",
        "api_secret": values.api_secret,
        "app_id": values.app_id,
        "client_code": values.client_code,
        "api_key": values.api_key,
        "app_key": values.app_key,
        "api_type": values.api_type,
        "demat_userid": values.demat_userid,
        "group_service": values.groupservice,
        "licence": values.licence1,
        "Editor_role": Role,
        "device": check_Device(),
        "multiple_strategy_select": values.multiple_strategy_select === false ? '0' : '1'
      }



      await dispatch(Update_User({ req: req, token: user_token })).unwrap().then((response) => {

        if (response.status === 409) {
          toast.error(response.data.msg);
        }
        else if (response.status) {
          toast.success(response.msg);
          setTimeout(() => {
            navigate("/admin/allclients")
          }, 500);
        }
        else if (!response.status) {
          toast.error(response.msg);
        }

      })
    }
  });



  useEffect(() => {
    
    formik.setFieldValue('username', UserData.data.data !== undefined && UserData.data.data[0].UserName);
    formik.setFieldValue('fullName', UserData.data.data !== undefined && UserData.data.data[0].FullName);
    formik.setFieldValue('email', UserData.data.data !== undefined && UserData.data.data[0].Email);
    formik.setFieldValue('mobile', UserData.data.data !== undefined && UserData.data.data[0].PhoneNo);
    formik.setFieldValue('licence', UserData.data.data !== undefined && UserData.data.data[0].license_type);
    formik.setFieldValue('licence1', UserData.data.data !== undefined && UserData.data.data[0].licence);
    formik.setFieldValue('groupservice', UserData.data.data !== undefined && UserData.data.data[0].groupservices_clients.groupService_id);
    formik.setFieldValue('service_given_month', UserData.data.data !== undefined && UserData.data.data[0].service_given_month);
    formik.setFieldValue('broker', UserData.data.data !== undefined && UserData.data.data[0].broker);
    formik.setFieldValue('parent_id', UserData.data.data !== undefined && UserData.data.data[0].parent_id);
    formik.setFieldValue('app_id', UserData.data.data !== undefined && UserData.data.data[0].app_id);
    formik.setFieldValue('api_type', UserData.data.data !== undefined && UserData.data.data[0].api_type);
    formik.setFieldValue('client_code', UserData.data.data !== undefined && UserData.data.data[0].client_code);
    formik.setFieldValue('api_key', UserData.data.data !== undefined && UserData.data.data[0].api_key);
    formik.setFieldValue('api_secret', UserData.data.data !== undefined && UserData.data.data[0].api_secret);
    formik.setFieldValue('app_key', UserData.data.data !== undefined && UserData.data.data[0].app_key);
    formik.setFieldValue('demat_userid', UserData.data.data !== undefined && UserData.data.data[0].demat_userid);
    formik.setFieldValue('todate', UserData.data.data !== undefined && f_time(UserData.data.data[0].EndDate));
    formik.setFieldValue('fromDate', UserData.data.data !== undefined && f_time(UserData.data.data[0].StartDate));
    formik.setFieldValue('multiple_strategy_select', UserData.data.data !== undefined && UserData.data.data[0].multiple_strategy_select === '1' ? true : false);
  }, [UserData.data]);


  useEffect(() => {
    let Service_Month_Arr = [];
    for (let index = 1; index <= 1; index++) {

      const currentDate = UserData.data.data !== undefined
        ? new Date(UserData.data.data[0].EndDate)
        : new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const endMonth = (currentMonth + index) % 12;
      const endYear = currentYear + Math.floor((currentMonth + index) / 12);

      // Create the end date string
      const endDate = `${index} Month Licence Expires On ${currentDate.getDate()}-${endMonth + 1}-${endYear}`;

      Service_Month_Arr.push({ month: index, endDate });
    }
    setfirst(Service_Month_Arr);
  }, [UserData.data.data]);

  const brokerOptions = [
    { label: 'Alice Blue', value: '2' },
    { label: 'Angel', value: '12' },
    { label: '5 Paisa', value: '14' },
    { label: 'Zerodha', value: '15' },
    
    
  ];
  const fields = [
    { name: 'username', label: 'Username', type: 'text', label_size: 12, col_size: 6, disable: false },
    { name: 'fullName', label: 'FullName', type: 'text', label_size: 12, col_size: 6, disable: false },
    { name: 'email', label: 'Email', type: 'text', label_size: 12, col_size: 6, disable: false },
    { name: 'mobile', label: 'Mobile', type: 'text', label_size: 12, col_size: 6, disable: false },
    {
      name: 'licence',
      label: 'Licence',
      type: 'select',
      options: UserData.data.data !== undefined && UserData.data.data[0].license_type === "2" ? [
        { label: 'Live', value: '2' },
      ] : UserData.data.data !== undefined && UserData.data.data[0].license_type === "0" ? [
        { label: '2 Days', value: '0' },
        { label: 'Live', value: '2' },
      ] : [
        { label: '2 Days', value: '0' },
        { label: 'Demo', value: '1' },
        { label: 'Live', value: '2' },
      ]
      , label_size: 12, col_size: 6, disable: UserData.data.data !== undefined && UserData.data.data[0].license_type === "2" ? true : false
    },
    {
      name: 'licence1', label: 'Use License Month', type: 'text', label_size: 12, col_size: 6, disable: true,
      showWhen: values => values.licence === '2'

    },
    {
      name: 'tomonth',
      label: 'To Month',
      type: 'select',
      options: first && first.map((item) => ({ label: item.endDate, value: item.month })),
      showWhen: values => values.licence === '2'
      , label_size: 12, col_size: 6, disable: false, isSelected: true
    },
    {
      name: 'broker',
      label: 'Broker',
      type: 'select',
      options: GetBrokerInfo && GetBrokerInfo.map((item) => ({ label: item.title, value: item.broker_id })),
      showWhen: values => values.licence === '2' || values.licence === '0'
      , label_size: 12, col_size: 6, disable: false
    },
    //  For Demo Only Client
    {
      name: 'fromDate', label: 'From Date', type: 'date',
      showWhen: values => values.licence === '1'
      , label_size: 12, col_size: 6, disable: false
    },
    {
      name: 'todate', label: 'To Date', type: 'date',
      showWhen: values => values.licence === '1'
      , label_size: 12, col_size: 6, disable: false
    },
    {
      name: 'api_key',
      label: formik.values.broker == 19 ? "Api Key" : formik.values.broker == 4 ? 'App Key' : formik.values.broker == 7 ? "Consumer Key" : formik.values.broker == 9 ? "Vendor Key" : formik.values.broker == 8 ? 'App Key' : formik.values.broker == 10 ? 'App Key' : "'Api Key", type: 'text',
      showWhen: values => values.broker === '4' || values.broker === '7' || values.broker === '8' || values.broker === '9' || values.broker === '10' || values.broker === '11' || values.broker === '12' || values.broker === '14' || values.broker === '15' || values.broker === '6' || values.broker === '19',
      label_size: 12, col_size: 6, disable: false
    },
    {
      name: 'client_code',
      label: formik.values.broker == 1 ? 'User' : formik.values.broker == 4 ? "Client Code" : formik.values.broker == 7 ? "User Name" : formik.values.broker == 9 ? "Vander Id" : formik.values.broker == 11 ? "Client Code" : formik.values.broker == 11 ? "client_code" : 'User Id', type: 'text',
      showWhen: values => values.broker === '1' || values.broker === '5' || values.broker === '4' || values.broker === '7' || values.broker === '9' || values.broker === '11' || values.broker === '6',
      label_size: 12, col_size: 6, disable: false
    },
    {
      name: 'demat_userid',
      label: formik.values.broker === 9 ? 'User Id' : 'Demat UserId', type: 'text',
      showWhen: values => values.broker === '9' || values.broker === '2',
      label_size: 12, col_size: 6, disable: false
    },
    {
      name: 'app_id',
      label: formik.values.broker == 1 ? 'Verification Code' : formik.values.broker == 5 ? 'Password' : formik.values.broker == 7 ? 'Demat Password' : formik.values.broker == 11 ? 'Password' : formik.values.broker == 2 ? 'Demat UserId' : formik.values.broker == 13 ? 'App Id' : formik.values.broker == 9 ? 'Password' : formik.values.broker == 14 ? 'User Id ' : 'App Id', type: 'text',
      showWhen: values =>
        //  values.broker === '2' ||
        values.broker === '1' || values.broker === "3" || values.broker === '5' || values.broker === '7' || values.broker === '9' || values.broker === '11' || values.broker === '13' || values.broker === '14',
      label_size: 12, col_size: 6, disable: false
    },
    {
      name: 'app_key',
      label: formik.values.broker == 5 || 6 ? 'App Key' : "", type: 'text',
      showWhen: values => values.broker === '5',
      label_size: 12, col_size: 6, disable: false
    },

    {
      name: 'api_secret',
      label: formik.values.broker == 1 ? 'Password Code' : formik.values.broker == 5 ? 'DOB' : formik.values.broker == 7 ? 'Consumer Secret' : formik.values.broker == 9 ? 'Encryption Secret Key' : formik.values.broker == 10 ? 'Api Secret Key' : formik.values.broker == 11 ? '2FA' : formik.values.broker == 14 ? 'Encryption Key' : 'Api Secret', type: 'text',
      showWhen: values => values.broker === '1'
        ||
        // values.broker === '2' ||
        values.broker === '3' || values.broker === '5' || values.broker === '6' || values.broker === '7' || values.broker === '8' || values.broker === '9' || values.broker === '10' || values.broker === '11' || values.broker === '13' || values.broker === '14' || values.broker === '15'|| values.broker === '19',
      label_size: 12, col_size: 6, disable: false
    },
    {
      name: 'api_type',
      label: formik.values.broker == 5 ? 'DOB' : formik.values.broker == 7 ? 'Trade Api Password' : formik.values.broker == 9 ? 'Encryption IV' : 'Api Secret', type: 'text',
      showWhen: values =>
        values.broker === '7' || values.broker === '9',
      label_size: 12, col_size: 6, disable: false
    },

    {
      name: 'parent_id',
      label: 'Sub-Admin',
      type: 'select',
      options: Addsubadmin.data && Addsubadmin.data.map((item) => ({ label: item.FullName, value: item._id }))
      , label_size: 12, col_size: 6, disable: false
    },
    {
      name: 'service_given_month',
      label: 'Service Given To Month',
      type: 'select',
      options: [
        { label: '0', value: '0' },
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },
        { label: '9', value: '9' },
        { label: '10', value: '10' },
        { label: '11', value: '11' },
        { label: '12', value: '12' },
      ],
      showWhen: values =>
        values.licence === '2' || values.licence === 2
      , label_size: 12, col_size: 6, disable: false

    },


    {
      name: 'groupservice',
      label: 'Group Service',
      type: 'select',

      options:
        AllGroupServices.data && AllGroupServices.data.map((item) => ({ label: item.name, value: item._id }))
      , label_size: 12, col_size: 6, disable: false
    },


    { name: 'multiple_strategy_select', label: 'Mutiple Selection Strategy', type: 'checkbox', label_size: 12, col_size: 6, disable: false, check_box_true: formik.values.multiple_strategy_select ? true : false,
  },
  ];



  useEffect(() => {



    
  ////////////////--------------START BROKER SET KEY----------------///////////
    if (formik.values.broker === '1' || formik.values.broker === 1) {
      formik.setFieldValue('api_key', 'null');
      formik.setFieldValue('app_key', 'null');
      formik.setFieldValue('api_type', 'null');
      formik.setFieldValue('demat_userid', 'null');
    }

    if (formik.values.broker === '2' || formik.values.broker === 2) {
      formik.setFieldValue('api_key', 'null');
      formik.setFieldValue('app_key', 'null');
      formik.setFieldValue('client_code', 'null');
      formik.setFieldValue('api_type', 'null');
      // formik.setFieldValue('demat_userid', 'null');
    }

    if (formik.values.broker === '3' || formik.values.broker === 3) {
      formik.setFieldValue('api_key', 'null');
      formik.setFieldValue('app_key', 'null');
      formik.setFieldValue('client_code', 'null');
      formik.setFieldValue('api_type', 'null');
      formik.setFieldValue('demat_userid', 'null');
    }

    if (formik.values.broker === '4' || formik.values.broker === 4) {
      formik.setFieldValue('api_secret', 'null');
      formik.setFieldValue('app_id', 'null');
      formik.setFieldValue('app_key', 'null');
      formik.setFieldValue('api_type', 'null');
      formik.setFieldValue('demat_userid', 'null');
    }

    if (formik.values.broker === '5' || formik.values.broker === 5) {
      formik.setFieldValue('api_secret', 'null');
      formik.setFieldValue('api_key', 'null');
      formik.setFieldValue('app_key', 'null');
      formik.setFieldValue('api_type', 'null');
      formik.setFieldValue('demat_userid', 'null');
    }

    if (formik.values.broker === '6' || formik.values.broker === 6) {
      formik.setFieldValue('app_id', 'null');
      formik.setFieldValue('app_key', 'null');
      // formik.setFieldValue('client_code', 'null');
      formik.setFieldValue('api_type', 'null');
      formik.setFieldValue('demat_userid', 'null');
    }

    if (formik.values.broker === '7' || formik.values.broker === 7) {
      formik.setFieldValue('app_key', 'null');
      formik.setFieldValue('api_type', 'null');
      // formik.setFieldValue('demat_userid', 'null');
    }

    if (formik.values.broker === '8' || formik.values.broker === 8) {
      formik.setFieldValue('app_id', 'null');
      formik.setFieldValue('app_key', 'null');
      formik.setFieldValue('client_code', 'null');
      formik.setFieldValue('api_type', 'null');
      formik.setFieldValue('demat_userid', 'null');
    }

    if (formik.values.broker === '9' || formik.values.broker === 9) {
      formik.setFieldValue('app_key', 'null');
      formik.setFieldValue('api_type', 'null');
    }

    if (formik.values.broker === '10' || formik.values.broker === 10) {
      formik.setFieldValue('app_id', 'null');
      formik.setFieldValue('app_key', 'null');
      formik.setFieldValue('client_code', 'null');
      formik.setFieldValue('api_type', 'null');
      formik.setFieldValue('demat_userid', 'null');
    }
    if (formik.values.broker === '11' || formik.values.broker === 11) {
      formik.setFieldValue('app_key', 'null');
      formik.setFieldValue('api_type', 'null');
      formik.setFieldValue('demat_userid', 'null');
    }
    if (formik.values.broker === '12' || formik.values.broker === 12) {
      formik.setFieldValue('api_secret', 'null');
      formik.setFieldValue('app_id', 'null');
      formik.setFieldValue('app_key', 'null');
      formik.setFieldValue('client_code', 'null');
      formik.setFieldValue('api_type', 'null');
      formik.setFieldValue('demat_userid', 'null');
    }
    if (formik.values.broker === '13' || formik.values.broker === 13) {
      formik.setFieldValue('api_key', 'null');
      formik.setFieldValue('app_key', 'null');
      formik.setFieldValue('client_code', 'null');
      formik.setFieldValue('api_type', 'null');
      formik.setFieldValue('demat_userid', 'null');
    }
    if (formik.values.broker === '14' || formik.values.broker === 14) {
      formik.setFieldValue('app_key', 'null');
      formik.setFieldValue('client_code', 'null');
      formik.setFieldValue('api_type', 'null');
      formik.setFieldValue('demat_userid', 'null');
    }
    if (formik.values.broker === '15' || formik.values.broker === 15) {
      formik.setFieldValue('app_id', 'null');
      formik.setFieldValue('app_key', 'null');
      formik.setFieldValue('client_code', 'null');
      formik.setFieldValue('api_type', 'null');
      formik.setFieldValue('demat_userid', 'null');
    }

    if (formik.values.broker === '19' || formik.values.broker === 19) {
      formik.setFieldValue('app_id', 'null');
      formik.setFieldValue('app_key', 'null');
      formik.setFieldValue('client_code', 'null');
      formik.setFieldValue('api_type', 'null');
      formik.setFieldValue('demat_userid', 'null');
    }






  ////////////////--------------END BROKER SET KEY----------------///////////




    if (formik.values.licence === '2' || formik.values.licence === 2) {
      formik.setFieldValue('fromDate', null);
      formik.setFieldValue('todate', null);
    }
    if (formik.values.licence === '1' || formik.values.licence === 1) {
      formik.setFieldValue('tomonth', null);
      formik.setFieldValue('broker', null);
    }
    if (formik.values.licence === '0' || formik.values.licence === 0) {
      // formik.setFieldValue('tomonth', null);
      // formik.setFieldValue('broker', null);
      formik.setFieldValue('fromDate', null);
      formik.setFieldValue('todate', null);
    }

  }, [formik.values.broker, formik.values.licence]);




  const getGroupeServics = async () => {
    if (formik.values.groupservice) {
      await dispatch(Get_Service_By_Group_Id({ _id: formik.values.groupservice })).unwrap()
        .then((response) => {
          if (response.status) {
            setGetServices({
              loading: false,
              data: response.data,
            });
          }
        });
    }
  };
  useEffect(() => {
    getGroupeServics();
  }, [formik.values.groupservice]);



  // GET ALL GROUP SERVICES NAME / GET ALL SUBAMDIN / STRATEGY
  const data = async () => {
    await dispatch(GET_ALL_GROUP_SERVICES()).unwrap()
      .then((response) => {


        if (response.status) {
          setAllGroupServices({
            loading: false,
            data: response.data
          });
        }
      })

    await dispatch(Get_All_SUBADMIN()).unwrap()
      .then((response) => {
        if (response.status) {
          setAddsubadmin({
            loading: false,
            data: response.data
          });
        }
      })

    await dispatch(Get_All_Service_for_Client({
      req: {
      }, token: user_token
    })).unwrap().then((response) => {
      if (response.status) {


        setAllStrategy({
          loading: false,
          data: response.data
        });
      }
    })




    await dispatch(All_Api_Info_List({ token: user_token, url: Config.react_domain, brokerId: -1 })).unwrap()
      .then((response) => {
        if (response.status) {
          setGetBrokerInfo(
            response.data
          );
        }
      })

  }


  useEffect(() => {
    data()
  }, [])



  //  For Checked Strategy

  const handleStrategyChange = (event) => {
    const strategyId = event.target.value;
    setSelectedStrategies((prevStrategies) => {
      return prevStrategies.map((strategy) => strategy.id === strategyId
        ? { ...strategy, checked: !strategy.checked }
        : strategy
      );
    });
  };

  useEffect(() => {
    if (UserData.data.strategy) {
      const initialSelectedStrategies = AllStrategy.data.map((strategy) => ({
        id: strategy._id,
        name: strategy.strategy_name,
        checked: UserData.data.strategy.some(
          (item) => item.strategy_id === strategy._id
        ),
      }));
      setSelectedStrategies(initialSelectedStrategies);
    }
  }, [UserData.data.strategy, AllStrategy.data]);


  return (
    <>
      <Content Page_title="Edit  Client" button_title='Back' route="/admin/allclients"
        showEdit={true} show_Stat_End_date={UserData.data.data !== undefined && UserData.data.data[0]}>
        <Formikform fieldtype={fields.filter(field => !field.showWhen || field.showWhen(formik.values))} formik={formik} btn_name="Update"
          fromDate={formik.values.fromDate}
          toDate={formik.values.todate}
          additional_field={
            <>
              {/*  For Show All Services */}
              <h6>All Group Service</h6>

              {GetServices && GetServices.data.map((strategy) => (
                <div className={`col-lg-2 `} key={strategy._id}>
                  <div className="col-lg-12 ">
                    <label className="form-check-label bg-primary text-white py-2 px-4" for={strategy.ServiceResult.name}>{`${strategy.ServiceResult.name}[${strategy.categories.segment}]`}</label>
                  </div>
                </div>
              ))}
              <label class="toggle mt-3">
                <input class="toggle-checkbox bg-primary" type="checkbox" onChange={(e) => {
                  setShowAllStratagy(e.target.checked)
                }} />

              </label>


              <>
                <h6>All Strategy</h6>
                {selectedStrategies.map((strategy) => (
                  <div className={`col-lg-2 mt-2`} key={strategy.id}>
                    <div className="row ">
                      <div className="col-lg-12 ">
                        <div className="form-check custom-checkbox mb-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name={strategy.id}
                            value={strategy.id}
                            onChange={(e) => handleStrategyChange(e)}
                            checked={strategy.checked}
                          />
                          <label className="form-check-label" htmlFor={strategy.name}>
                            {strategy.name}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>

              {/* ) : ""} */}
            </>
           
            
          }
        />
        <ToastButton />
      </Content >
    </>
  )
}
export default AddClient

