import request from './request';

// post requests with data
export function candidateLogin(data) {
  return request({
    url: 'candidatemobilelogin',
    method: 'post',
    data,
  });
}

export function getStatusList(id) {
  return request({
    url: `type=status_list`,
    method: 'get',
  });
}
export function addTimeSheet(data) {
  return request({
    url: `timesheet`,
    method: 'post',
    data,
  });
}
export function EditTimeSheet(id, data) {
  return request({
    url: `timesheet/${id}`,
    method: 'put',
    data,
  });
}
export function EditExpense(id, data) {
  return request({
    url: `expenses/${id}`,
    method: 'put',
    data,
  });
}
export function addExpense(data) {
  return request({
    url: `expenses`,
    method: 'post',
    data,
  });
}

export function addLeaveRequest(data) {
  return request({
    url: `leaves`,
    method: 'post',
    data,
  });
}

export function updateLeaveRequest(data, id) {
  return request({
    url: `leaves/${id}`,
    method: 'put',
    data,
  });
}

export function DeleteLeaveRequest(id) {
  return request({
    url: `leaves/${id}`,
    method: 'delete',
  });
}
/// get requests
export function getCandidateDetailsById(id) {
  return request({
    url: `candidates/${id}`,
    method: 'get',
  });
}

export function listTimeSheetByCandidateId(candidate_id) {
  return request({
    url: `candidate_id=${candidate_id}&type=timesheet_list`,
    method: 'get',
  });
}

export function jobTimeTypes(job_id) {
  return request({
    url: `job_id=${job_id}&type=job_time_types`,
    method: 'get',
  });
}

export function getEditTimeSheetDetails(
  time_sheet_id,
  candidate_id,
  
  job_id,
) {
  return request({
    url: `job_id=${job_id}&time_sheet_id=${time_sheet_id}&candidate_id=${candidate_id}&type=timesheet_edit_details`,
    method: 'get',
  });
}

export function timeSheetDetailsById(timesheet_id,) {
  return request({
    url: `time_sheet_id=${timesheet_id}&type=timesheet_details`,
    method: 'get',
  });
}

export function listCandidateJobs(candidate_id, approver_type = 1) {
  return request({
    url: `approver_type=${approver_type}&candidate_id=${candidate_id}&type=job_list`,
    method: 'get',
  });
}

export function getJobWorkingDays(job_id) {
  return request({
    url: `job_id=${job_id}&type=work_days`,
    method: 'get',
  });
}

export function getExpenseslist( candidate_id) {
  return request({
    url: `candidate_id=${candidate_id}&type=expenses_list`,
    method: 'get',
  });
}

export function getExpensesDetails( expense_id) {
  return request({
    url: `type=expenses_details`,
    method: 'get',
  });
}

export function getExpenseTypeCategoryBillType( company_id) {
  return request({
    url: `company_id=${company_id}&type=expenses_type`,
    method: 'get',
  });
}

export function getJobs( item_id) {
  console.log(
    `type=candidate&item_id=${item_id}`,
  );
  return request({
    url: `jobs?associatedjobs=career_portal_jobs&type=candidate&item_id=${item_id}`,
    method: 'get',
  });
}
export function getEditExpensesDetails(expense_id, candidate_id) {
  return request({
    url: `expense_id=${expense_id}&candidate_id=${candidate_id}&type=edit_expenses_details`,
    method: 'get',
  });
}

export function getLeavesList(candidate_id) {
  return request({
    url: `candidate_id=${candidate_id}&type=list_candidate_leaves`,
    method: 'get',
  });
}

export function getleavesBalance( candidate_id, policy_id) {
  return request({
    url: `policy_id=${policy_id}&candidate_id=${candidate_id}&type=leave_balance`,
    method: 'get',
  });
}

export function getpolicylist() {
  return request({
    url: `type=list_policy`,
    method: 'get',
  });
}
export async function uploadFile(data) {
  var myHeaders = new Headers();
  myHeaders.append(
    'Authorization',
    'Bearer 4545980ce66bd555d903f7dc739f91e631606eb1',
  );
  // myHeaders.append("Content-Type", "multipart/form-data; boundary=<calculated when request is sent>");
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: data,
    redirect: 'follow',
  };

  return fetch('https://0a7f-203-82-55-110.ngrok.io/files', requestOptions);
}

// delete request

export async function DeleteTimeSheet(id) {
  return request({
    url: `timesheet/${id}`,
    method: 'delete',
  });
}

export async function DeleteExpense(id) {
  return request({
    url: `expenses/${id}`,
    method: 'delete',
  });
}

export const GetProfileDetails = async id => {
  return request({
    url: `candidate/${id}`,
    method: 'get',
  });
};

export const GetReferences = async id => {
  return request({
    url: `reference/${id}`,
    method: 'get',
  });
};
