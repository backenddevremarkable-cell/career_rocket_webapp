import {
  getDivisionByStateId,
  getDivisionCitiesByDivisionId,
  getBlocksByCityId,
} from "@/lib/api";

/** Handles { status, message, data: [...] } and plain arrays */
export function extractApiList(payload) {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.response)) return payload.response;
  if (Array.isArray(payload.result)) return payload.result;
  return [];
}

/** Staging: { status, message, data: {...} } | Local flat | { response: {...} } */
export function unwrapCounsellingSession(payload) {
  if (!payload) return {};
  if (payload.data && typeof payload.data === "object" && !Array.isArray(payload.data)) {
    return payload.data;
  }
  if (payload.response && typeof payload.response === "object") {
    return payload.response;
  }
  return payload;
}

function numOrNull(value) {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/**
 * Params from createCounsellingSession (per your API spec):
 * - getDivisionByStateId  → stateId  = session.divisionId (fallback: session.stateId, student.stateId)
 * - getDivisionCitiesByDivisionId → divisionId = session.divisionCityId (fallback: session.divisionId)
 * - getBlocksByCityId → id = city.cityId for session.divisionCityId (fallback: session.blockId)
 */
export function resolveLookupParams(session, student = {}) {
  const s = unwrapCounsellingSession(session);

  return {
    stateId:
      numOrNull(s.divisionId) ??
      numOrNull(s.stateId) ??
      numOrNull(student.stateId),
    divisionIdForCities:
      numOrNull(s.divisionCityId) ?? numOrNull(s.divisionId),
    divisionCityId: numOrNull(s.divisionCityId),
    blockId: numOrNull(s.blockId),
    session: s,
  };
}

export function findCityByRecordId(cities, divisionCityRecordId) {
  return cities.find((c) => String(c.id) === String(divisionCityRecordId));
}

/** Load all 3 dropdown lists from live APIs using counselling session fields */
export async function fetchCounsellingLookups(session, token, student = {}) {
  const params = resolveLookupParams(session, student);
  const s = params.session;

  let divisions = [];
  let cities = [];
  let blocks = [];

  if (params.stateId != null) {
    const divisionsRes = await getDivisionByStateId(params.stateId, token);
    divisions = extractApiList(divisionsRes);
  }

  if (params.divisionIdForCities != null) {
    const citiesRes = await getDivisionCitiesByDivisionId(
      params.divisionIdForCities,
      token
    );
    cities = extractApiList(citiesRes);
  }

  const blocksApiId = resolveBlocksApiId(cities, s);
  if (blocksApiId != null) {
    const blocksRes = await getBlocksByCityId(blocksApiId, token);
    blocks = extractApiList(blocksRes);
  }

  return { session: s, divisions, cities, blocks };
}

function resolveBlocksApiId(cities, session) {
  const city = findCityByRecordId(cities, session.divisionCityId);
  return city?.cityId ?? numOrNull(session.blockId);
}

export async function fetchCitiesForDivision(divisionId, token) {
  const id = numOrNull(divisionId);
  if (id == null) return [];
  const res = await getDivisionCitiesByDivisionId(id, token);
  return extractApiList(res);
}

/** When user picks a division city, blocks API needs that row's cityId */
export async function fetchBlocksForCity(cities, divisionCityRecordId, token) {
  const city = findCityByRecordId(cities, divisionCityRecordId);
  const id = city?.divisionId ?? numOrNull(divisionCityRecordId);
  if (id == null) return [];
  const res = await getBlocksByCityId(id, token);
  return extractApiList(res);
}

//divisionCityId

export function divisionOptionLabel(item) {
  const id = item?.id ?? "";
  const name = item?.name_hi ?? item?.name_en ?? item?.name ?? "";
  return `${id} - ${name}`;
}

export function cityOptionLabel(item) {
  const id = item?.id ?? "";
  const name = item?.cityName_hi ?? item?.cityName_en ?? "";
  return `${id} - ${name}`;
}

export function blockOptionLabel(item) {
  const id = item?.id ?? "";
  const name = item?.name_hi ?? item?.name_en ?? "";
  return `${id} - ${name}`;
}

export function divisionOptionValue(item) {
  return String(item?.id ?? "");
}

export function cityOptionValue(item) {
  return String(item?.id ?? "");
}

export function blockOptionValue(item) {
  return String(item?.id ?? "");
}
