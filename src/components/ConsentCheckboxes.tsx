import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

interface ConsentCheckboxesProps {
  privacyChecked: boolean;
  onPrivacyChange: (checked: boolean) => void;
  privacyError?: string;
}

/**
 * Reusable GDPR consent checkbox for forms.
 * - Mandatory privacy policy acceptance
 */
const ConsentCheckboxes = ({
  privacyChecked,
  onPrivacyChange,
  privacyError,
}: ConsentCheckboxesProps) => {
  return (
    <div className="space-y-3">
      {/* Mandatory: Privacy policy */}
      <div className="flex items-start space-x-3">
        <Checkbox
          id="consent-privacy"
          checked={privacyChecked}
          onCheckedChange={(v) => onPrivacyChange(v === true)}
          className="mt-0.5"
        />
        <div className="space-y-1 leading-none">
          <label
            htmlFor="consent-privacy"
            className="text-sm font-normal text-muted-foreground cursor-pointer leading-relaxed"
          >
            Ik ga akkoord met de{" "}
            <Link
              to="/privacyverklaring"
              target="_blank"
              className="text-primary hover:underline font-medium"
            >
              privacyverklaring
            </Link>{" "}
            *
          </label>
          {privacyError && (
            <p className="text-[0.8rem] font-medium text-destructive">{privacyError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsentCheckboxes;
