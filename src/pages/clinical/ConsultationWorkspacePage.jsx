import { useEffect, useMemo, useState } from "react";
import { CalendarClock, CheckCircle2, FlaskConical, Pill, Printer, Save, Send, Stethoscope } from "lucide-react";
import { useParams } from "react-router-dom";
import { DiagnosisPanel } from "@/components/clinical/DiagnosisPanel";
import { MedicalAlertCard } from "@/components/clinical/MedicalAlertCard";
import { MedicalTimeline } from "@/components/clinical/MedicalTimeline";
import { PrescriptionBuilder } from "@/components/clinical/PrescriptionBuilder";
import { SOAPNoteEditor } from "@/components/clinical/SOAPNoteEditor";
import { TreatmentPlanPanel } from "@/components/clinical/TreatmentPlanPanel";
import { VitalsPanel } from "@/components/clinical/VitalsPanel";
import { GlassCard } from "@/components/cards/GlassCard";
import { PetClinicalSummaryCard } from "@/components/cards/PetClinicalSummaryCard";
import { PriorityBadge } from "@/components/badges/PriorityBadge";
import { StatusBadge } from "@/components/badges/StatusBadge";
import { LoadingSkeleton } from "@/components/empty-states/LoadingSkeleton";
import { PageContainer } from "@/components/layout/PageContainer";
import { AddVitalsModal } from "@/components/modals/AddVitalsModal";
import { CompleteConsultationModal } from "@/components/modals/CompleteConsultationModal";
import { ScheduleFollowUpModal } from "@/components/modals/ScheduleFollowUpModal";
import { ActionButton } from "@/components/ui/ActionButton";
import { consultationService } from "@/services/consultationService";

const tabs = ["SOAP", "Vitals", "Prescription", "Timeline", "Follow-up"];

export default function ConsultationWorkspacePage() {
  const { id } = useParams();
  const [consultation, setConsultation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("SOAP");
  const [saved, setSaved] = useState(true);
  const [notice, setNotice] = useState("");
  const [vitalsOpen, setVitalsOpen] = useState(false);
  const [followUpOpen, setFollowUpOpen] = useState(false);
  const [completeOpen, setCompleteOpen] = useState(false);
  const [prescription, setPrescription] = useState({ medicines: [{}] });

  useEffect(() => {
    consultationService.getConsultationById(id || "consult-001").then((data) => {
      setConsultation(data);
      setPrescription({ petName: data.petName, ownerName: data.ownerName, doctor: data.doctor, diagnosis: data.diagnosis.primary, medicines: [{}] });
      setLoading(false);
    });
  }, [id]);

  const updateConsultation = (patch) => setConsultation((current) => ({ ...current, ...patch }));
  const saveSoap = async () => {
    const updated = await consultationService.updateSOAPNote(consultation.id, consultation.soap);
    updateConsultation(updated);
    setSaved(true);
    setNotice("SOAP draft saved locally.");
  };
  const updateVitals = async (payload) => {
    const updated = await consultationService.updateVitals(consultation.id, payload);
    updateConsultation(updated);
    setVitalsOpen(false);
    setNotice("Vitals updated locally.");
  };
  const requestLab = async () => {
    const updated = await consultationService.requestLab(consultation.id, { reason: consultation.diagnosis.primary });
    updateConsultation(updated);
    setNotice("Lab request queued locally.");
  };
  const complete = async (payload) => {
    const updated = await consultationService.completeConsultation(consultation.id, payload);
    updateConsultation(updated);
    setCompleteOpen(false);
    setNotice("Consultation completed locally.");
  };
  const createFollowUp = async (payload) => {
    await consultationService.createFollowUp(consultation.id, payload);
    updateConsultation({ status: "follow_up_needed" });
    setFollowUpOpen(false);
    setNotice("Follow-up scheduled locally.");
  };

  const tabContent = useMemo(() => {
    if (!consultation) return null;
    if (activeTab === "Vitals") return <VitalsPanel vitals={consultation.vitals} onEdit={() => setVitalsOpen(true)} />;
    if (activeTab === "Prescription") return <PrescriptionBuilder value={prescription} onChange={setPrescription} />;
    if (activeTab === "Timeline") return <MedicalTimeline items={consultation.timeline} />;
    if (activeTab === "Follow-up") return <TreatmentPlanPanel plan={consultation.treatmentPlan} onChange={(plan) => updateConsultation({ treatmentPlan: plan })} />;
    return <SOAPNoteEditor value={consultation.soap} saved={saved} onChange={(soap) => { updateConsultation({ soap }); setSaved(false); }} />;
  }, [activeTab, consultation, prescription, saved]);

  if (loading) return <PageContainer className="space-y-4"><LoadingSkeleton className="min-h-[116px]" /><LoadingSkeleton variant="profile" /></PageContainer>;

  return (
    <PageContainer className="space-y-5">
      <GlassCard className="space-y-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-primary-dark">{consultation.queueNo} - {consultation.consultationType}</p>
            <h1 className="mt-2 font-heading text-2xl font-black text-text-main md:text-3xl">{consultation.petName}</h1>
            <p className="mt-2 text-sm font-semibold text-text-secondary">{consultation.species} - {consultation.breed} - Owner: {consultation.ownerName}</p>
            <div className="mt-3 flex flex-wrap gap-2"><StatusBadge status={consultation.status} /><PriorityBadge priority={consultation.priority} /><span className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-text-muted">{consultation.doctor}</span><span className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-text-muted">{consultation.branch}</span><span className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-text-muted">{consultation.startedAt}</span></div>
          </div>
          <div className="flex flex-wrap gap-2">
            <ActionButton icon={Save} onClick={saveSoap}>Save Draft</ActionButton>
            <ActionButton icon={CheckCircle2} variant="ghost" onClick={() => setCompleteOpen(true)}>Complete Consultation</ActionButton>
            <ActionButton icon={Printer} variant="ghost">Print Summary</ActionButton>
            <ActionButton icon={Send} variant="ghost">Send to Pharmacy</ActionButton>
            <ActionButton icon={FlaskConical} variant="ghost" onClick={requestLab}>Request Lab</ActionButton>
            <ActionButton icon={CalendarClock} variant="ghost" onClick={() => setFollowUpOpen(true)}>Schedule Follow-up</ActionButton>
          </div>
        </div>
      </GlassCard>
      {notice ? <div className="rounded-[20px] border border-success/20 bg-success/10 px-4 py-3 text-sm font-bold text-success">{notice}</div> : null}

      <div className="grid gap-5 xl:grid-cols-[300px_minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <PetClinicalSummaryCard consultation={consultation} />
          <VitalsPanel vitals={consultation.vitals} onEdit={() => setVitalsOpen(true)} />
        </div>
        <GlassCard className="space-y-4">
          <div className="flex flex-wrap gap-2 rounded-[22px] bg-white/45 p-1">
            {tabs.map((tab) => <button key={tab} type="button" className={`rounded-full px-3 py-2 text-xs font-bold transition ${activeTab === tab ? "bg-primary text-white shadow-soft" : "text-text-secondary hover:bg-white/70"}`} onClick={() => setActiveTab(tab)}>{tab}</button>)}
          </div>
          {tabContent}
          <div className="grid gap-4 min-[900px]:grid-cols-2">
            <DiagnosisPanel diagnosis={consultation.diagnosis} onChange={(diagnosis) => updateConsultation({ diagnosis })} />
            <TreatmentPlanPanel plan={consultation.treatmentPlan} onChange={(treatmentPlan) => updateConsultation({ treatmentPlan })} />
          </div>
        </GlassCard>
        <div className="space-y-4">
          <MedicalAlertCard alerts={consultation.alerts} />
          <GlassCard className="space-y-3" padding="compact">
            <h2 className="font-heading text-base font-bold text-text-main">Previous History</h2>
            <MedicalTimeline items={consultation.timeline} />
          </GlassCard>
        </div>
      </div>

      <AddVitalsModal open={vitalsOpen} vitals={consultation.vitals} onClose={() => setVitalsOpen(false)} onSubmit={updateVitals} />
      <ScheduleFollowUpModal open={followUpOpen} source={consultation} onClose={() => setFollowUpOpen(false)} onSubmit={createFollowUp} />
      <CompleteConsultationModal open={completeOpen} consultation={consultation} onClose={() => setCompleteOpen(false)} onSubmit={complete} />
    </PageContainer>
  );
}
