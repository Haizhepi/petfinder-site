package petfinder.site.common.user.sitter;

import alloy.util.Momento;
import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.List;

public class SitterAvailabilityDto implements Momento<String> {
    private String principal;
    //private List<Boolean> availability;
    private String availability;
    private String startDate;
    private String endDate;
    private String startTime;
    private List<String> invitations;

    public List<String> getInvitations() {
        return invitations;
    }

    public void setInvitations(List<String> invitations) {
        this.invitations = invitations;
    }

    public void addInvitation(String bookingId) {
        invitations.add(bookingId);
    }

    public SitterAvailabilityDto(String principal, String availability, String startDate, String endDate, String startTime, String endTime) {
        this.principal = principal;
        this.availability = availability;
        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    private String endTime;

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public SitterAvailabilityDto(String principal, String availability) {
        this.principal = principal;
        this.availability = availability;
    }

    private SitterAvailabilityDto() {}
    public String getPrincipal() {
        return principal;
    }

    public void setPrincipal(String principal) {
        this.principal = principal;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    @JsonIgnore
    @Override
    public String getMomento() {
        return principal;
    }

}
