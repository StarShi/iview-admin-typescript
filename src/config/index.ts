let isDevelopment:boolean = process.env.NODE_ENV === "development" ? true : false;
const GlobalConfig:any = {
    domain_name: isDevelopment ? 'https://mooma.club' : ''//域名https://mooma.mobi
};

export default GlobalConfig;