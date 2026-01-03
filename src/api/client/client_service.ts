// import PgConnectionPool from "@common/config/DataSourceConnectionDynamically";

interface Client {
  client_id: number;
  tenant_id: number;
  role_id: number;
  email: string;
  full_name: string;
}

const ClientService = async (): Promise<{ success: boolean; message: string; data: Client[] | null }> => {
  try {
    // const result = await PgConnectionPool.query<Client>(`SELECT * FROM clients`);
    return { success: true, message: "Successful fetch clients", data: [] };
  } catch (error) {
    return Promise.reject({
      success: false,
      message: `Client List Unsuccessful ${error}`,
      data: null,
    });
  } finally {
    // Optional: Any cleanup operations can be performed here
  }
};

export default ClientService;
