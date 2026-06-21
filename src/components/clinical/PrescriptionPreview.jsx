export function PrescriptionPreview({ prescription }) {
  if (!prescription) return null;

  return (
    <section className="rounded-[24px] border border-white/70 bg-white/80 p-5 text-text-main shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-text-main/10 pb-4">
        <div>
          <p className="font-heading text-xl font-black">VetOS Pro Clinic</p>
          <p className="mt-1 text-sm text-text-secondary">Doctor prescription preview</p>
        </div>
        <div className="text-right text-sm font-bold text-text-secondary">
          <p>{prescription.id || "Draft"}</p>
          <p>{prescription.createdAt || "Today"}</p>
        </div>
      </div>
      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <p><span className="font-bold">Pet:</span> {prescription.petName}</p>
        <p><span className="font-bold">Owner:</span> {prescription.ownerName}</p>
        <p><span className="font-bold">Doctor:</span> {prescription.doctor}</p>
        <p><span className="font-bold">Diagnosis:</span> {prescription.diagnosis}</p>
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="min-w-[620px] text-left text-sm">
          <thead className="border-b border-text-main/10 text-xs uppercase text-text-muted">
            <tr>
              {["Medicine", "Dosage", "Frequency", "Duration", "Route", "Qty"].map((header) => <th key={header} className="px-3 py-2">{header}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-text-main/10">
            {(prescription.medicines || []).map((medicine, index) => (
              <tr key={`${medicine.name}-${index}`}>
                <td className="px-3 py-3 font-bold">{medicine.name}</td>
                <td className="px-3 py-3">{medicine.dosage}</td>
                <td className="px-3 py-3">{medicine.frequency}</td>
                <td className="px-3 py-3">{medicine.duration}</td>
                <td className="px-3 py-3">{medicine.route}</td>
                <td className="px-3 py-3">{medicine.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm leading-6 text-text-secondary">{prescription.doctorNotes || prescription.instructions}</p>
      <div className="mt-8 flex justify-end">
        <div className="w-48 border-t border-text-main/30 pt-2 text-center text-xs font-bold text-text-muted">Doctor Signature</div>
      </div>
    </section>
  );
}
