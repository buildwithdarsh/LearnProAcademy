"use client";

import { useState, useCallback, useMemo } from "react";
import { useAsyncData } from "@/hooks/useAsyncData";
import { Skeleton, CardSkeleton } from "@/components/ui/Skeleton";
import { TopBar } from "@/components/layout/TopBar";
import { institutes, EXAMS, CITIES } from "@/lib/mock-data";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import {
  Search,
  MapPin,
  Star,
  Users,
  GraduationCap,
  TrendingUp,
  BadgeCheck,
  Flame,
  ChevronDown,
  SlidersHorizontal,
  Building2,
} from "lucide-react";

export default function DiscoveryPage() {
  const [examFilter, setExamFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [feeMin, setFeeMin] = useState("");
  const [feeMax, setFeeMax] = useState("");
  const [modeFilter, setModeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetcher = useCallback(() => institutes, []);
  const { data, loading } = useAsyncData(fetcher, 1000);

  const filteredInstitutes = useMemo(() => {
    if (!data) return [];
    return data.filter((inst) => {
      if (searchQuery && !inst.name.toLowerCase().includes(searchQuery.toLowerCase()) && !inst.tagline.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (examFilter && !inst.exams.includes(examFilter)) return false;
      if (cityFilter && inst.location.city !== cityFilter) return false;
      if (feeMin && inst.feeRange.max < parseInt(feeMin)) return false;
      if (feeMax && inst.feeRange.min > parseInt(feeMax)) return false;
      return true;
    });
  }, [data, searchQuery, examFilter, cityFilter, feeMin, feeMax]);

  return (
    <>
      <TopBar title="Discover Institutes" subtitle="Find the best coaching for your exam" />
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Search & Filters */}
        <div className="card">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
            <div className="relative lg:col-span-2">
              <label className="text-xs font-medium text-text-tertiary mb-1.5 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
                <input
                  type="text"
                  placeholder="Search institutes by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input !pl-10"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-text-tertiary mb-1.5 block">Exam</label>
              <select
                value={examFilter}
                onChange={(e) => setExamFilter(e.target.value)}
                className="select"
              >
                <option value="">All Exams</option>
                {EXAMS.map((exam) => (
                  <option key={exam} value={exam}>{exam}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-text-tertiary mb-1.5 block">City</label>
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="select"
              >
                <option value="">All Cities</option>
                {CITIES.map((c) => (
                  <option key={c.city} value={c.city}>{c.city}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-medium text-text-tertiary mb-1.5 block">Min Fee</label>
                <input
                  type="number"
                  placeholder="₹0"
                  value={feeMin}
                  onChange={(e) => setFeeMin(e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-text-tertiary mb-1.5 block">Max Fee</label>
                <input
                  type="number"
                  placeholder="₹5L"
                  value={feeMax}
                  onChange={(e) => setFeeMax(e.target.value)}
                  className="input"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-secondary">
            Showing <span className="font-semibold text-text-primary">{loading ? "..." : filteredInstitutes.length}</span> institutes
          </p>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-text-tertiary" />
            <span className="text-sm text-text-secondary">Sort by: Relevance</span>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card p-0 overflow-hidden">
                <Skeleton className="h-36 md:h-48 w-full rounded-none" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {filteredInstitutes.map((inst) => (
              <div key={inst.id} className="card p-0 overflow-hidden hover:shadow-md transition-shadow group">
                {/* Cover Image */}
                <div className="relative h-36 md:h-48">
                  <img
                    src={inst.coverImage}
                    alt={inst.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {/* Logo */}
                  <div className="absolute bottom-3 left-4 flex items-end gap-3">
                    <img
                      src={inst.logo}
                      alt={`${inst.name} logo`}
                      className="h-12 w-12 rounded-lg border-2 border-white shadow-md object-cover"
                    />
                    <div>
                      <h3 className="text-white font-bold text-base leading-tight">{inst.name}</h3>
                      <p className="text-white/80 text-xs">{inst.tagline}</p>
                    </div>
                  </div>
                  {/* Badges */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    {inst.verified && (
                      <span className="badge bg-white/90 text-primary-700 text-[10px] gap-1">
                        <BadgeCheck className="h-3 w-3" /> Verified
                      </span>
                    )}
                    {inst.trending && (
                      <span className="badge bg-orange-500 text-white text-[10px] gap-1">
                        <Flame className="h-3 w-3" /> Trending
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  {/* Rating & Location */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-0.5 bg-warning-50 px-2 py-0.5 rounded-md">
                        <Star className="h-3.5 w-3.5 text-warning-500 fill-warning-500" />
                        <span className="text-sm font-semibold text-warning-600">{inst.rating}</span>
                      </div>
                      <span className="text-xs text-text-tertiary">({formatNumber(inst.reviewCount)} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-text-secondary">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="text-xs">{inst.location.area}, {inst.location.city}</span>
                    </div>
                  </div>

                  {/* Exam Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {inst.exams.map((exam) => (
                      <span key={exam} className="badge badge-primary text-[10px]">{exam}</span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-border-light">
                    <div className="text-center">
                      <p className="text-sm font-bold text-text-primary">{formatNumber(inst.studentCount)}</p>
                      <p className="text-[10px] text-text-tertiary">Students</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-text-primary">{inst.facultyCount}</p>
                      <p className="text-[10px] text-text-tertiary">Faculty</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-text-primary">{inst.passRate}%</p>
                      <p className="text-[10px] text-text-tertiary">Pass Rate</p>
                    </div>
                  </div>

                  {/* Fee Range */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary">Fee Range</span>
                    <span className="text-sm font-semibold text-text-primary">
                      {formatCurrency(inst.feeRange.min)} — {formatCurrency(inst.feeRange.max)}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 pt-1">
                    <button className="btn-secondary btn-sm flex-1">View Details</button>
                    <button className="btn-primary btn-sm flex-1">Book Demo</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredInstitutes.length === 0 && (
          <div className="card text-center py-12">
            <Building2 className="h-12 w-12 text-text-tertiary mx-auto mb-3" />
            <p className="text-text-secondary">No institutes match your filters. Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </>
  );
}
