import { useState } from "react";
import { Link } from "react-router-dom";

import { utilService } from "../services/util.service";

export function EmailPreview({ email }) {
  return <article>{email.subject}</article>;
}
