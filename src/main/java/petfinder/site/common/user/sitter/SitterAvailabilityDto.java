package petfinder.site.common.user.sitter;

import alloy.util.Momento;
import org.codehaus.jackson.annotate.JsonIgnore;

import java.util.List;

public class SitterAvailabilityDto implements Momento<String> {
    private String principal;
    private List<Boolean> availability;

    public SitterAvailabilityDto(String principal, List<Boolean> availability) {
        this.principal = principal;
        this.availability = availability;
    }

    public String getPrincipal() {
        return principal;
    }

    public void setPrincipal(String principal) {
        this.principal = principal;
    }

    public List<Boolean> getAvailability() {
        return availability;
    }

    public void setAvailability(List<Boolean> availability) {
        this.availability = availability;
    }

    @JsonIgnore
    @Override
    public String getMomento() {
        return principal;
    }

}
