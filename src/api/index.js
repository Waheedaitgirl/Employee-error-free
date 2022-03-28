import request from './request';

export function candidateLogin(data){
    return request({
        url: 'candidatemobilelogin',
        method: 'post',
        data,
    });
}

export function getCandidateDetailsById(id){
    return request({
        url: `candidates/${id}`,
        method: 'get',
    });
}

export function listTimeSheetByCandidateId(account_id,candidate_id){
   
    return request({
        url: `timesheet?account_id=${account_id}&candidate_id=${candidate_id}&type=timesheet_list`,
        method: 'get'
    });
}

export function jobTimeTypes(account_id,job_id){
    return request({
        url: `timesheet?account_id=${account_id}&job_id=${job_id}&type=job_time_types`,
        method: 'get',
    });
}

export function asddTimeSheet(data){
    return request({
        url: `timesheet`,
        method: 'post',
        data
    });
}

export function timeSheetDetailsById(timesheet_id,account_id){
    return request({
        url: `timesheet?account_id=${account_id}&time_sheet_id=${timesheet_id}&type=timesheet_details`,
        method: 'get',
    });
}

export function listCandidateJobs(account_id,candidate_id){
    return request({
        url: `timesheet?account_id=${account_id}&candidate_id=${candidate_id}&type=job_list`,
        method: 'get',
    });
}

export function getJobWorkingDays(account_id,job_id){
    return request({
        url: `timesheet?account_id=${account_id}&job_id=${job_id}&type=work_days`,
        method: 'get',
    });
}