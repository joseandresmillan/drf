import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchContacts, updateContactStatus } from '../../../redux/actions/contacts';

const STATUS_LABELS = { new: 'Nuevo', read: 'Leído', replied: 'Respondido' };
const STATUS_COLORS = {
  new: 'bg-amber-100 text-amber-700',
  read: 'bg-blue-100 text-blue-700',
  replied: 'bg-green-100 text-green-700',
};

const ContactList = ({ list, loading, fetchContacts, updateContactStatus }) => {
  useEffect(() => { fetchContacts(); }, [fetchContacts]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Mensajes de Contacto</h2>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500" />
        </div>
      ) : list.length === 0 ? (
        <p className="text-gray-500 text-center py-12">No hay mensajes aún.</p>
      ) : (
        <div className="space-y-4">
          {list.map((contact) => (
            <div key={contact.id} className="bg-white rounded-xl shadow p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-gray-900">{contact.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[contact.status]}`}>
                      {STATUS_LABELS[contact.status]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">
                    <a href={`mailto:${contact.email}`} className="hover:underline">{contact.email}</a>
                    {contact.phone && <span> · {contact.phone}</span>}
                  </p>
                  <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">{contact.message}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(contact.created_at).toLocaleString('es')}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <select
                    value={contact.status}
                    onChange={(e) => updateContactStatus(contact.id, e.target.value)}
                    className="border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="new">Nuevo</option>
                    <option value="read">Leído</option>
                    <option value="replied">Respondido</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  list: state.contacts.list,
  loading: state.contacts.loading,
});

export default connect(mapStateToProps, { fetchContacts, updateContactStatus })(ContactList);
