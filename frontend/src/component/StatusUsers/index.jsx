import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFormData } from "../../../redux/formularActions";
import moment from "moment";

import HeaderNavigationLoggin from "../HeaderNavigationLoggin";

const StatusUsers = () => {
  const dispatch = useDispatch();
  const allForms = useSelector((state) => state.formular.formData);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    dispatch(fetchFormData());
  }, [dispatch]);

  const filteredFormData =
    userData.permission === "admin"
      ? allForms
      : allForms.filter((form) => form.email === userData.email);

  return (
    <div className="flex bg-black flex-col items-center w-full gap-12 h-screen">
      <HeaderNavigationLoggin />
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
            
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Form Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Waiting Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredFormData.map((form) => (
              <tr key={form.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {form.name}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {form.form_status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {form.created_at ? (
                    moment(form.created_at).format("HH:mm:ss, YYYY-MM-DD")
                  ) : (
                    <></>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {form.waiting_time ? (
                    moment(form.waiting_time).format("HH:mm:ss")
                  ) : (
                    <></>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatusUsers;
