import type{JobApplication} from './types'


const STORAGE_KEY = 'cmp_applications';


function saveApplications(applications:JobApplication[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
}

function readApplications(): JobApplication[] | null {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null
    try{
        return JSON.parse(data) as JobApplication[]; 
    }catch{
        return null;
    }
}


export { saveApplications, readApplications};

