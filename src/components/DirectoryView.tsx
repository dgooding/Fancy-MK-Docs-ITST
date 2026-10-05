import React, { useState } from 'react';
import {
  Users,
  Search,
  Mail,
  MessageSquare,
  Shield,
  Clock,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { mockOwnerContacts } from '../data/blueprintData';
import { OwnerContact } from '../types/docs';

export const DirectoryView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOwners = mockOwnerContacts.filter(owner => {
    const q = searchQuery.toLowerCase();
    return (
      owner.name.toLowerCase().includes(q) ||
      owner.role.toLowerCase().includes(q) ||
      owner.team.toLowerCase().includes(q) ||
      owner.ownedCategories.some(c => c.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-100/70 px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-blue-200">
          <Users className="w-4 h-4" />
          <span>Governance & Accountability</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
          Documentation Owners & Subject Matter Experts
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
          Every document in the ITSD portal has a designated team and individual owner responsible for technical accuracy and 90-day review cycles.
        </p>

        {/* Filter Input */}
        <div className="max-w-md mt-6 relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search owners by name, team, or category..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 shadow-2xs"
          />
        </div>
      </div>

      {/* Owner Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOwners.map((owner, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 transition-all shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    {owner.name}
                  </h3>
                  <div className="text-xs font-bold text-blue-700">
                    {owner.role}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    Team: {owner.team}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-slate-900 tabular-nums">
                    {owner.docCount} Docs
                  </div>
                  <div className="text-[10px] text-emerald-600 font-bold uppercase">Owner</div>
                </div>
              </div>

              <div className="space-y-2 mt-4 pt-3 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-[11px] text-slate-500 font-medium block mb-1">Owned Domains</span>
                  <div className="space-y-1">
                    {owner.ownedCategories.map((cat, cIdx) => (
                      <div key={cIdx} className="text-slate-700 text-[11px] bg-slate-50 p-1.5 rounded border border-slate-200 font-medium">
                        {cat}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Last Reviewed:</span>
                  </span>
                  <span className="font-mono text-slate-700 font-bold">{owner.lastReviewDate}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
              <a
                href={`mailto:${owner.email}`}
                className="text-slate-600 hover:text-blue-600 font-medium flex items-center gap-1 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
              <span className="text-slate-300">·</span>
              <a
                href={`#${owner.slackChannel}`}
                className="text-blue-600 hover:text-blue-800 font-bold hover:underline flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{owner.slackChannel}</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* RACI Matrix Overview */}
      <div className="mt-12 p-6 rounded-xl bg-white border border-slate-200 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-600" />
          <span>Documentation Governance RACI Framework</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="border-b border-slate-200 text-[11px] text-slate-500 uppercase font-mono font-bold">
              <tr>
                <th className="pb-3 pr-4">Activity</th>
                <th className="pb-3 px-4">Responsible (R)</th>
                <th className="pb-3 px-4">Accountable (A)</th>
                <th className="pb-3 px-4">Consulted (C)</th>
                <th className="pb-3 pl-4">Informed (I)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3.5 pr-4 font-bold text-slate-900">Authoring New SOP</td>
                <td className="py-3.5 px-4">ITSD Subject Matter Tech</td>
                <td className="py-3.5 px-4">Operations Supervisor</td>
                <td className="py-3.5 px-4">Domain Principal Architect</td>
                <td className="py-3.5 pl-4">All Tier 1/2 Techs</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-bold text-slate-900">Modifying Application Access Model</td>
                <td className="py-3.5 px-4">IAM Systems Engineer</td>
                <td className="py-3.5 px-4">Principal IAM Architect</td>
                <td className="py-3.5 px-4">SecOps Lead</td>
                <td className="py-3.5 pl-4">Service Desk Leads</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4 font-bold text-slate-900">90-Day Freshness Review</td>
                <td className="py-3.5 px-4">Designated Document Owner</td>
                <td className="py-3.5 px-4">Documentation Guild Lead</td>
                <td className="py-3.5 px-4">ITSM Platform Lead</td>
                <td className="py-3.5 pl-4">Jira Audit Board</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
